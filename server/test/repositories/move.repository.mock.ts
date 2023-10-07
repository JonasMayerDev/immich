import { IMoveRepository } from '@app/domain';

export const newMoveRepositoryMock = (): jest.Mocked<IMoveRepository> => {
  return {
    create: jest.fn(),
    get: jest.fn(),
    getDeletedMoves: jest.fn(),
    getFailedMoves: jest.fn(),
    update: jest.fn(),
    prune: jest.fn(),
    softDelete: jest.fn(),
    delete: jest.fn(),
  };
};
