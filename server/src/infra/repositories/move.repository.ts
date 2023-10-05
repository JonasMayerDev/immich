import { IMoveRepository, PathType } from '@app/domain/move';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoveEntity } from '../entities/move.entity';

@Injectable()
export class MoveRepository implements IMoveRepository {
  constructor(@InjectRepository(MoveEntity) private repository: Repository<MoveEntity>) {}

  create(id: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity> {
    return this.repository.save({ id, pathType, oldPath, newPath });
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
