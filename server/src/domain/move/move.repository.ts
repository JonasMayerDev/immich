import { MoveEntity, PathType } from '@app/infra/entities/move.entity';

export const IMoveRepository = 'IMoveRepository';

export interface IMoveRepository {
  create(entityId: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity>;
  get(entityId: string, pathType: PathType): Promise<MoveEntity | null>;
  getDeletedMoves(): Promise<MoveEntity[]>;
  getFailedMoves(): Promise<MoveEntity[]>;
  update(id: string, isMoved: boolean): Promise<MoveEntity>;
  softDelete(move: MoveEntity): Promise<MoveEntity>;
  delete(move: MoveEntity): Promise<MoveEntity>;
  prune(deletedBefore: Date): Promise<void>;
}
