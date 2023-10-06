import { MoveEntity } from '@app/infra/entities/move.entity';
import { Inject, Injectable } from '@nestjs/common';
import { IMoveRepository } from './move.repository';

@Injectable()
export class MoveService {
  constructor(@Inject(IMoveRepository) private repository: IMoveRepository) {}

  async handleCleanup() {
    for (const move of await this.repository.getDeletedMoves()) {
      if (this.isReadyForDeletion(move)) {
        this.repository.delete(move);
      }
    }

    return true;
  }

  private isReadyForDeletion(move: MoveEntity): boolean {
    if (!move.deletedAt) {
      return false;
    }

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDay() + 7) > move.deletedAt;
  }
}
