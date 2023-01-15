import { MigrationInterface, QueryRunner } from "typeorm";

export class createColumnDeletedAt1673803887687 implements MigrationInterface {
    name = 'createColumnDeletedAt1673803887687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" ADD "deletedAt" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" DROP COLUMN "deletedAt"`);
    }

}
