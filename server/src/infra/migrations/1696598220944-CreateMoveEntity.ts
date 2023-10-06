import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoveEntity1696598220944 implements MigrationInterface {
    name = 'CreateMoveEntity1696598220944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "move_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entityId" character varying NOT NULL, "pathType" character varying NOT NULL, "oldPath" character varying NOT NULL, "newPath" character varying NOT NULL, "isMoved" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_newPath_deletedAt" UNIQUE ("newPath", "deletedAt"), CONSTRAINT "UQ_entityId_pathType_deletedAt" UNIQUE ("entityId", "pathType", "deletedAt"), CONSTRAINT "PK_af608f132233acf123f2949678d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "move_history"`);
    }

}
