import { IMoveRepository } from '@app/domain/move';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThan, Not, Repository } from 'typeorm';
import { MoveEntity, PathType } from '../entities/move.entity';

@Injectable()
export class MoveRepository implements IMoveRepository {
  constructor(@InjectRepository(MoveEntity) private repository: Repository<MoveEntity>) {}

  create(entityId: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity> {
    return this.repository.save({ entityId, pathType, oldPath, newPath });
  }

  get(entityId: string, pathType: PathType): Promise<MoveEntity | null> {
    return this.repository.findOne({ where: { entityId, pathType } });
  }

  getDeletedMoves(): Promise<MoveEntity[]> {
    return this.repository.find({ withDeleted: true, where: { deletedAt: Not(IsNull()) } });
  }

  getFailedMoves(): Promise<MoveEntity[]> {
    return this.repository.find();
  }

  update(id: string, isMoved: boolean): Promise<MoveEntity> {
    return this.repository.save({ id, isMoved });
  }

  softDelete(move: MoveEntity): Promise<MoveEntity> {
    return this.repository.softRemove(move);
  }

  delete(move: MoveEntity): Promise<MoveEntity> {
    return this.repository.remove(move);
  }

  async prune(deletedBefore: Date): Promise<void> {
    await this.repository.delete({ deletedAt: LessThan(deletedBefore) });
  }
}
