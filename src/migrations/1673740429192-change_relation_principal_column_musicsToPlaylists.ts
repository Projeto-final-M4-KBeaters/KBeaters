import { MigrationInterface, QueryRunner } from "typeorm";

export class changeRelationPrincipalColumnMusicsToPlaylists1673740429192 implements MigrationInterface {
    name = 'changeRelationPrincipalColumnMusicsToPlaylists1673740429192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" DROP CONSTRAINT "FK_2c21c2692fead666193f4aba9a5"`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" DROP CONSTRAINT "FK_380b472353ef026803ce2441bed"`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" ADD CONSTRAINT "FK_380b472353ef026803ce2441bed" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" ADD CONSTRAINT "FK_2c21c2692fead666193f4aba9a5" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" DROP CONSTRAINT "FK_2c21c2692fead666193f4aba9a5"`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" DROP CONSTRAINT "FK_380b472353ef026803ce2441bed"`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" ADD CONSTRAINT "FK_380b472353ef026803ce2441bed" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" ADD CONSTRAINT "FK_2c21c2692fead666193f4aba9a5" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
