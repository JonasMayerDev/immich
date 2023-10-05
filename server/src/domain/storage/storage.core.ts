import { AssetEntity } from '@app/infra/entities';
import { PathType } from '@app/infra/entities/file-history.entity';
import { join } from 'node:path';
import { IAssetRepository } from '..';
import { APP_MEDIA_LOCATION } from '../domain.constant';
import { IFileHistoryRepository } from '../file-history';
import { IStorageRepository } from './storage.repository';

export enum StorageFolder {
  ENCODED_VIDEO = 'encoded-video',
  LIBRARY = 'library',
  UPLOAD = 'upload',
  PROFILE = 'profile',
  THUMBNAILS = 'thumbs',
}

export class StorageCore {
  constructor(
    private repository: IStorageRepository,
    private assetRepository: IAssetRepository,
    private fileHistoryRepository: IFileHistoryRepository,
  ) {}

  getFolderLocation(
    folder: StorageFolder.ENCODED_VIDEO | StorageFolder.UPLOAD | StorageFolder.PROFILE | StorageFolder.THUMBNAILS,
    userId: string,
  ) {
    return join(this.getBaseFolder(folder), userId);
  }

  getLibraryFolder(user: { storageLabel: string | null; id: string }) {
    return join(this.getBaseFolder(StorageFolder.LIBRARY), user.storageLabel || user.id);
  }

  getBaseFolder(folder: StorageFolder) {
    return join(APP_MEDIA_LOCATION, folder);
  }

  ensurePath(
    folder: StorageFolder.ENCODED_VIDEO | StorageFolder.UPLOAD | StorageFolder.PROFILE | StorageFolder.THUMBNAILS,
    ownerId: string,
    fileName: string,
  ): string {
    const folderPath = join(
      this.getFolderLocation(folder, ownerId),
      fileName.substring(0, 2),
      fileName.substring(2, 4),
    );
    this.repository.mkdirSync(folderPath);
    return join(folderPath, fileName);
  }

  async moveAssetFile(asset: AssetEntity, pathType: PathType, newPath: string) {
    const move = await this.fileHistoryRepository.initializeMove(asset, pathType);

    // the according path must exist because otherwise initializeMove(...) would throw an error
    switch (pathType) {
      case PathType.ORIGINAL:
        await this.repository.moveFile(asset.originalPath, newPath);
        await this.assetRepository.save({ id: asset.id, originalPath: newPath });
      case PathType.JPEG_THUMBNAIL:
        await this.repository.moveFile(asset.resizePath!, newPath);
        await this.assetRepository.save({ id: asset.id, resizePath: newPath });
      case PathType.WEBP_THUMBNAIL:
        await this.repository.moveFile(asset.webpPath!, newPath);
        await this.assetRepository.save({ id: asset.id, webpPath: newPath });
      case PathType.ENCODED_VIDEO:
        await this.repository.moveFile(asset.encodedVideoPath!, newPath);
        await this.assetRepository.save({ id: asset.id, encodedVideoPath: newPath });
      case PathType.SIDECAR:
        await this.repository.moveFile(asset.sidecarPath!, newPath);
        await this.assetRepository.save({ id: asset.id, sidecarPath: newPath });
    }

    await this.fileHistoryRepository.finishMove(move, newPath);
  }

  removeEmptyDirs(folder: StorageFolder) {
    return this.repository.removeEmptyDirs(this.getBaseFolder(folder));
  }
}
