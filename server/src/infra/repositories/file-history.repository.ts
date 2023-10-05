import { IFileHistoryRepository } from '@app/domain/file-history';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from '../entities';
import { FileHistoryEntity, PathType } from '../entities/file-history.entity';

@Injectable()
export class FileHistoryRepository implements IFileHistoryRepository {
  private logger = new Logger(FileHistoryRepository.name);

  constructor(@InjectRepository(FileHistoryEntity) private repository: Repository<FileHistoryEntity>) {}

  initializeMove(asset: AssetEntity, pathType: PathType): Promise<FileHistoryEntity> {
    switch (pathType) {
      case PathType.ORIGINAL:
        return this.repository.save({ asset, assetId: asset.id, pathType, oldPath: asset.originalPath });
      case PathType.JPEG_THUMBNAIL:
        if (!asset.resizePath) {
          throw new Error(`Asset ${asset.id} does not have a jpeg thumbnail`);
        }
        return this.repository.save({ asset, assetId: asset.id, pathType, oldPath: asset.resizePath });
      case PathType.WEBP_THUMBNAIL:
        if (!asset.webpPath) {
          throw new Error(`Asset ${asset.id} does not have a webp thumbnail`);
        }
        return this.repository.save({ asset, assetId: asset.id, pathType, oldPath: asset.webpPath });
      case PathType.ENCODED_VIDEO:
        if (!asset.encodedVideoPath) {
          throw new Error(`Asset ${asset.id} does not have an encoded video`);
        }
        return this.repository.save({ asset, assetId: asset.id, pathType, oldPath: asset.encodedVideoPath });
      case PathType.SIDECAR:
        if (!asset.sidecarPath) {
          throw new Error(`Asset ${asset.id} does not have a sidecar file`);
        }
        return this.repository.save({ asset, assetId: asset.id, pathType, oldPath: asset.sidecarPath });
    }
  }

  async finishMove(move: FileHistoryEntity, newPath: string): Promise<void> {
    await this.repository.save({ ...move, newPath });
    await this.repository.softDelete({ id: move.id });
  }
}
