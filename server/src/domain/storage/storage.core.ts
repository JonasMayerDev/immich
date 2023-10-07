import { PathType } from '@app/infra/entities/move.entity';
import { join } from 'node:path';
import { IAssetRepository } from '../asset';
import { APP_MEDIA_LOCATION } from '../domain.constant';
import { IMoveRepository } from '../move/move.repository';
import { IPersonRepository } from '../person';
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
    private moveRepository: IMoveRepository,
    private personRepository: IPersonRepository,
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

  async moveFile(id: string, pathType: PathType, originalPath: string, newPath: string) {
    const brokenMove = await this.moveRepository.get(id, pathType);
    if (brokenMove) {
      /*
        if a move was found, it is broken and can be in either of the following states:
         - isMoved is false : file wasn't even moved successfully => original path is still correct
         - isMoved is true: file was moved successfully but saving the changes to the repo failed
      */

      if (brokenMove.isMoved) {
        originalPath = brokenMove.newPath;
      }

      await this.moveRepository.delete(brokenMove);
    }

    const move = await this.moveRepository.create(id, pathType, originalPath, newPath);
    !brokenMove?.isMoved && (await this.repository.moveFile(originalPath, newPath));
    await this.moveRepository.update(move.id, true);

    switch (pathType) {
      case PathType.ORIGINAL:
        await this.assetRepository.save({ id, originalPath: newPath });
        break;
      case PathType.JPEG_THUMBNAIL:
        await this.assetRepository.save({ id, resizePath: newPath });
        break;
      case PathType.WEBP_THUMBNAIL:
        await this.assetRepository.save({ id, webpPath: newPath });
        break;
      case PathType.ENCODED_VIDEO:
        await this.assetRepository.save({ id, encodedVideoPath: newPath });
        break;
      case PathType.SIDECAR:
        await this.assetRepository.save({ id, sidecarPath: newPath });
        break;
      case PathType.FACE:
        await this.personRepository.update({ id, thumbnailPath: newPath });
    }

    await this.moveRepository.softDelete(move);
  }

  removeEmptyDirs(folder: StorageFolder) {
    return this.repository.removeEmptyDirs(this.getBaseFolder(folder));
  }
}
