import { Inject, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { IMoveRepository } from './move.repository';

@Injectable()
export class MoveService {
  constructor(@Inject(IMoveRepository) private repository: IMoveRepository) {}

  async handleCleanup() {
    this.repository.prune(DateTime.now().minus({ days: 7 }).toJSDate());

    return true;
  }
}
