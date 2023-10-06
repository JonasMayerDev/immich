import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('move_history')
@Unique('UQ_entityId_pathType_deletedAt', ['entityId', 'pathType', 'deletedAt'])
@Unique('UQ_newPath_deletedAt', ['newPath', 'deletedAt'])
export class MoveEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  entityId!: string;

  @Column({ type: 'varchar' })
  pathType!: PathType;

  @Column({ type: 'varchar' })
  oldPath!: string;

  @Column({ type: 'varchar' })
  newPath!: string;

  @Column({ type: 'boolean', default: false })
  isMoved!: boolean;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date | null;
}

export enum PathType {
  ORIGINAL = 'original',
  JPEG_THUMBNAIL = 'jpeg_thumbnail',
  WEBP_THUMBNAIL = 'webp_thumbnail',
  ENCODED_VIDEO = 'encoded_video',
  SIDECAR = 'sidecar',
  FACE = 'face',
}
