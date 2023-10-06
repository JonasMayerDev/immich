import { IMoveRepository } from '@app/domain/move';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { MoveEntity, PathType } from '../entities/move.entity';

@Injectable()
export class MoveRepository implements IMoveRepository {
  constructor(@InjectRepository(MoveEntity) private repository: Repository<MoveEntity>) {}

  create(entityId: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity> {
    return this.repository.save({ entityId, pathType, oldPath, newPath });
  }

  getDeletedMoves(): Promise<MoveEntity[]> {
    return this.repository.find({ withDeleted: true, where: { deletedAt: Not(IsNull()) } });
  }

  softDelete(move: MoveEntity): Promise<MoveEntity> {
    return this.repository.softRemove(move);
  }

  delete(move: MoveEntity): Promise<MoveEntity> {
    return this.repository.remove(move);
  }
}
