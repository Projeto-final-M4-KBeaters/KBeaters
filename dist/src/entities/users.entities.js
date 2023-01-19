"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const albuns_entities_1 = require("./albuns.entities");
const likes_entities_1 = require("./likes.entities");
const musics_entities_1 = require("./musics.entities");
const playlists_entities_1 = require("./playlists.entities");
let Users = class Users {
    hashPassword() {
        this.password = (0, bcryptjs_1.hashSync)(this.password, 10);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isPerformer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlists_entities_1.Playlists, userPlaylist => userPlaylist.user, { nullable: true }),
    __metadata("design:type", Array)
], Users.prototype, "playlists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => musics_entities_1.Musics, musics => musics.performer),
    __metadata("design:type", Array)
], Users.prototype, "musics", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => musics_entities_1.Musics, musics => musics.feats),
    __metadata("design:type", Array)
], Users.prototype, "feats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => albuns_entities_1.Albums, albums => albums.performer, { nullable: true }),
    __metadata("design:type", Array)
], Users.prototype, "albums", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_entities_1.Likes, likes => likes.user, { nullable: true }),
    __metadata("design:type", Array)
], Users.prototype, "likeMusic", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Users.prototype, "hashPassword", null);
Users = __decorate([
    (0, typeorm_1.Entity)("users")
], Users);
exports.Users = Users;
