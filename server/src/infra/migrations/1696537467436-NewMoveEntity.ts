import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMoveEntity1696537467436 implements MigrationInterface {
    name = 'NewMoveEntity1696537467436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "move_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entityId" character varying NOT NULL, "pathType" character varying NOT NULL, "oldPath" character varying NOT NULL, "newPath" character varying, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_af608f132233acf123f2949678d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "move_history"`);
    }

}
