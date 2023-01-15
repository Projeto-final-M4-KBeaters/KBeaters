import { MigrationInterface, QueryRunner } from "typeorm";

export class musicsDurationTypeToTime1673733464042 implements MigrationInterface {
    name = 'musicsDurationTypeToTime1673733464042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "musics" ADD "duration" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "musics" ADD "duration" character varying(150) NOT NULL`);
    }

}
