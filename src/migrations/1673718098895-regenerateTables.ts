import { MigrationInterface, QueryRunner } from "typeorm";

export class regenerateTables1673718098895 implements MigrationInterface {
    name = 'regenerateTables1673718098895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" DROP COLUMN "updatedAt"`);
    }

}
