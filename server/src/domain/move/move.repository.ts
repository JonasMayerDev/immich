import { MoveEntity, PathType } from '@app/infra/entities/move.entity';

export const IMoveRepository = 'IMoveRepository';

export interface IMoveRepository {
  create(entityId: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity>;
  getDeletedMoves(): Promise<MoveEntity[]>;
  softDelete(move: MoveEntity): Promise<MoveEntity>;
  delete(move: MoveEntity): Promise<MoveEntity>;
}
