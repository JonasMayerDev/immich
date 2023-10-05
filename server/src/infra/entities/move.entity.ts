import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('move_history')
export class MoveEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  entityId!: string;

  @Column({ type: 'varchar' })
  pathType!: PathType;

  @Column({ type: 'varchar' })
  oldPath!: string;

  @Column({ type: 'varchar', nullable: true })
  newPath!: string | null;

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
