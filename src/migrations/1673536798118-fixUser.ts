import { MigrationInterface, QueryRunner } from "typeorm";

export class fixUser1673536798118 implements MigrationInterface {
    name = 'fixUser1673536798118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
