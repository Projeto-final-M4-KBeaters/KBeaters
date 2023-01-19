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
exports.updateTables1673962019737 = void 0;
class updateTables1673962019737 {
    constructor() {
        this.name = 'updateTables1673962019737';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "playlists" ADD "isActive" boolean NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "playlists" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "albums" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "duration"`);
            yield queryRunner.query(`ALTER TABLE "playlists" ADD "duration" TIME NOT NULL DEFAULT '00:00:00'`);
            yield queryRunner.query(`ALTER TABLE "musics" ALTER COLUMN "isActive" SET DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "albums" ALTER COLUMN "isActive" SET DEFAULT true`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "albums" ALTER COLUMN "isActive" SET DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "musics" ALTER COLUMN "isActive" SET DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "duration"`);
            yield queryRunner.query(`ALTER TABLE "playlists" ADD "duration" character varying(150) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "isActive"`);
        });
    }
}
exports.updateTables1673962019737 = updateTables1673962019737;
