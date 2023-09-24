import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator';
import { Optional, ValidateUUID } from '../../domain.util';
import { BulkIdsDto } from '../response-dto';

export class AssetBulkUpdateDto extends BulkIdsDto {
  @Optional()
  @IsBoolean()
  isFavorite?: boolean;

  @Optional()
  @IsBoolean()
  isArchived?: boolean;
}

export class UpdateAssetDto {
  @Optional()
  @IsBoolean()
  isFavorite?: boolean;

  @Optional()
  @IsBoolean()
  isArchived?: boolean;

  @Optional()
  @IsString()
  description?: string;
}

export class UpdateAssetStackDto {
  @ValidateUUID()
  stackParentId!: string;

  @ValidateUUID({ each: true, optional: true })
  toAdd?: string[];

  @ValidateUUID({ each: true, optional: true })
  toRemove?: string[];
}

export class RandomAssetsDto {
  @Optional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  count?: number;
}
