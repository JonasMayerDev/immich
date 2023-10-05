import { MoveEntity, PathType } from '@app/infra/entities/move.entity';

export const IMoveRepository = 'IMoveRepository';

export interface IMoveRepository {
  create(id: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity>;

  softDelete(id: string): Promise<void>;
}
