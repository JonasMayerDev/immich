import { Inject, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { IAssetRepository } from '../asset';
import { IPersonRepository } from '../person';
import { IStorageRepository, StorageCore } from '../storage';
import { IMoveRepository } from './move.repository';

@Injectable()
export class MoveService {
  private storageCore: StorageCore;

  constructor(
    @Inject(IAssetRepository) assetRepository: IAssetRepository,
    @Inject(IMoveRepository) private repository: IMoveRepository,
    @Inject(IPersonRepository) personRepository: IPersonRepository,
    @Inject(IStorageRepository) storageRepository: IStorageRepository,
  ) {
    this.storageCore = new StorageCore(storageRepository, assetRepository, repository, personRepository);
  }

  async handleCleanup() {
    this.repository.prune(DateTime.now().minus({ days: 7 }).toJSDate());

    return true;
  }

  async handleRetry() {
    const failedMoves = await this.repository.getFailedMoves();

    for (const move of failedMoves) {
      await this.storageCore.moveFile(move.entityId, move.pathType, move.oldPath, move.newPath);
    }

    return true;
  }
}
