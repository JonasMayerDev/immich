import { MoveEntity } from '@app/infra/entities/move.entity';

export const IMoveRepository = 'IMoveRepository';

export interface IMoveRepository {
  create(id: string, pathType: PathType, oldPath: string, newPath: string): Promise<MoveEntity>;

  softDelete(id: string): Promise<void>;
}

export enum PathType {
  ORIGINAL = 'original',
  JPEG_THUMBNAIL = 'jpeg_thumbnail',
  WEBP_THUMBNAIL = 'webp_thumbnail',
  ENCODED_VIDEO = 'encoded_video',
  SIDECAR = 'sidecar',
  FACE = 'face',
}
