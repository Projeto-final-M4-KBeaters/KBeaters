"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMigrations1673660463774 = void 0;
class generateMigrations1673660463774 {
    constructor() {
        this.name = 'generateMigrations1673660463774';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "performersToAlbums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumsId" uuid, "ownerId" uuid, "featId" uuid, CONSTRAINT "PK_fd5381c72a1993d0176a454e884" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "performersToMusics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "musicsId" uuid, "ownerId" uuid, "featId" uuid, CONSTRAINT "PK_ebb15370e9ba7935a58142aee91" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "playlists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "duration" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "isPerformer" boolean NOT NULL DEFAULT false, "isAdmin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "likeMusicId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b01f7a6daa606ffdbebe121b4a" UNIQUE ("likeMusicId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "musics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "duration" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "albumsId" uuid, "genresId" uuid, "likesId" uuid, CONSTRAINT "PK_a2e622f30df5467a860991af728" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "duration" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "musics_playlists_playlists" ("musicsId" uuid NOT NULL, "playlistsId" uuid NOT NULL, CONSTRAINT "PK_252ccb7c1cf97d4967d166fcfd8" PRIMARY KEY ("musicsId", "playlistsId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_579e9f5e58c1e615c0c246e13c" ON "musics_playlists_playlists" ("musicsId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_e2d6dd9db820e24cce617db61b" ON "musics_playlists_playlists" ("playlistsId") `);
            yield queryRunner.query(`ALTER TABLE "performersToAlbums" ADD CONSTRAINT "FK_efe4add9b6cdbce74faa950c4ad" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "performersToAlbums" ADD CONSTRAINT "FK_6a11dcd6e88f81bae9d4269d41e" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "performersToAlbums" ADD CONSTRAINT "FK_eed68cf9703bd68ca5940362b48" FOREIGN KEY ("featId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "performersToMusics" ADD CONSTRAINT "FK_405daf338712eb1e8c225a3e311" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "performersToMusics" ADD CONSTRAINT "FK_ac739fb6e4b90aa15dddaee80bc" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "performersToMusics" ADD CONSTRAINT "FK_481148024cb2dae916f849d6556" FOREIGN KEY ("featId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b01f7a6daa606ffdbebe121b4a6" FOREIGN KEY ("likeMusicId") REFERENCES "likes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "FK_236ccda53b682b4c04205c323e2" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "FK_afe913cd21b848e96da824813e2" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "FK_c41c199df6ae313b7f048a9ae9e" FOREIGN KEY ("likesId") REFERENCES "likes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "musics_playlists_playlists" ADD CONSTRAINT "FK_579e9f5e58c1e615c0c246e13cd" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "musics_playlists_playlists" ADD CONSTRAINT "FK_e2d6dd9db820e24cce617db61b1" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "musics_playlists_playlists" DROP CONSTRAINT "FK_e2d6dd9db820e24cce617db61b1"`);
            yield queryRunner.query(`ALTER TABLE "musics_playlists_playlists" DROP CONSTRAINT "FK_579e9f5e58c1e615c0c246e13cd"`);
            yield queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "FK_c41c199df6ae313b7f048a9ae9e"`);
            yield queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "FK_afe913cd21b848e96da824813e2"`);
            yield queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "FK_236ccda53b682b4c04205c323e2"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b01f7a6daa606ffdbebe121b4a6"`);
            yield queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
            yield queryRunner.query(`ALTER TABLE "performersToMusics" DROP CONSTRAINT "FK_481148024cb2dae916f849d6556"`);
            yield queryRunner.query(`ALTER TABLE "performersToMusics" DROP CONSTRAINT "FK_ac739fb6e4b90aa15dddaee80bc"`);
            yield queryRunner.query(`ALTER TABLE "performersToMusics" DROP CONSTRAINT "FK_405daf338712eb1e8c225a3e311"`);
            yield queryRunner.query(`ALTER TABLE "performersToAlbums" DROP CONSTRAINT "FK_eed68cf9703bd68ca5940362b48"`);
            yield queryRunner.query(`ALTER TABLE "performersToAlbums" DROP CONSTRAINT "FK_6a11dcd6e88f81bae9d4269d41e"`);
            yield queryRunner.query(`ALTER TABLE "performersToAlbums" DROP CONSTRAINT "FK_efe4add9b6cdbce74faa950c4ad"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_e2d6dd9db820e24cce617db61b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_579e9f5e58c1e615c0c246e13c"`);
            yield queryRunner.query(`DROP TABLE "musics_playlists_playlists"`);
            yield queryRunner.query(`DROP TABLE "albums"`);
            yield queryRunner.query(`DROP TABLE "musics"`);
            yield queryRunner.query(`DROP TABLE "likes"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "playlists"`);
            yield queryRunner.query(`DROP TABLE "performersToMusics"`);
            yield queryRunner.query(`DROP TABLE "performersToAlbums"`);
            yield queryRunner.query(`DROP TABLE "genres"`);
        });
    }
}
exports.generateMigrations1673660463774 = generateMigrations1673660463774;
