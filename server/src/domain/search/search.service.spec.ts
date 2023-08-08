import {
  newAssetRepositoryMock,
  newMachineLearningRepositoryMock,
  newSmartInfoRepositoryMock,
  newSystemConfigRepositoryMock,
} from '@test';
import { plainToInstance } from 'class-transformer';
import { IAssetRepository } from '../asset';
import { IMachineLearningRepository, ISmartInfoRepository } from '../smart-info';
import { ISystemConfigRepository } from '../system-config';
import { SearchDto } from './dto';
import { SearchService } from './search.service';

jest.useFakeTimers();

describe(SearchService.name, () => {
  let sut: SearchService;
  let assetMock: jest.Mocked<IAssetRepository>;
  let configMock: jest.Mocked<ISystemConfigRepository>;
  let machineMock: jest.Mocked<IMachineLearningRepository>;
  let smartInfoMock: jest.Mocked<ISmartInfoRepository>;

  beforeEach(() => {
    assetMock = newAssetRepositoryMock();
    configMock = newSystemConfigRepositoryMock();
    machineMock = newMachineLearningRepositoryMock();
    smartInfoMock = newSmartInfoRepositoryMock();
    sut = new SearchService(configMock, machineMock, smartInfoMock, assetMock);
  });

  it('should work', () => {
    expect(sut).toBeDefined();
  });

  describe('request dto', () => {
    it('should convert smartInfo.tags to a string list', () => {
      const instance = plainToInstance(SearchDto, { 'smartInfo.tags': 'a,b,c' });
      expect(instance['smartInfo.tags']).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty smartInfo.tags', () => {
      const instance = plainToInstance(SearchDto, {});
      expect(instance['smartInfo.tags']).toBeUndefined();
    });

    it('should convert smartInfo.objects to a string list', () => {
      const instance = plainToInstance(SearchDto, { 'smartInfo.objects': 'a,b,c' });
      expect(instance['smartInfo.objects']).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty smartInfo.objects', () => {
      const instance = plainToInstance(SearchDto, {});
      expect(instance['smartInfo.objects']).toBeUndefined();
    });
  });
});
