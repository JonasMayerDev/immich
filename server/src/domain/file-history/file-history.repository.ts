import { AssetEntity } from '@app/infra/entities';
import { FileHistoryEntity, PathType } from '@app/infra/entities/file-history.entity';

export const IFileHistoryRepository = 'IFileHistoryRepository';

export interface IFileHistoryRepository {
  initializeMove(asset: AssetEntity, pathType: PathType): Promise<FileHistoryEntity>;

  finishMove(move: FileHistoryEntity, newPath: string): Promise<void>;
}
