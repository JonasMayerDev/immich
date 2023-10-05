import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity('file_history')
export class FileHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => AssetEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  asset!: AssetEntity;

  @Column({ type: 'varchar' })
  assetId!: string;

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
  ORIGINAL,
  JPEG_THUMBNAIL,
  WEBP_THUMBNAIL,
  ENCODED_VIDEO,
  SIDECAR,
}
