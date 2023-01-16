import { MigrationInterface, QueryRunner } from "typeorm";

export class fixIsActiveMusicsColumn1673900335864 implements MigrationInterface {
    name = 'fixIsActiveMusicsColumn1673900335864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" DROP COLUMN "isActive"`);
    }

}
