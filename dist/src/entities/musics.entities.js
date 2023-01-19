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
exports.Musics = void 0;
const typeorm_1 = require("typeorm");
const albuns_entities_1 = require("./albuns.entities");
const genres_entities_1 = require("./genres.entities");
const likes_entities_1 = require("./likes.entities");
const playlists_entities_1 = require("./playlists.entities");
const users_entities_1 = require("./users.entities");
//import { PlaylistsToMusics } from "./playlists_musics.entities";
let Musics = class Musics {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Musics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Musics.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", String)
], Musics.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Musics.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => albuns_entities_1.Albums, albums => albums.musics),
    __metadata("design:type", Array)
], Musics.prototype, "albums", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genres_entities_1.Genres, genres => genres.musics),
    __metadata("design:type", genres_entities_1.Genres)
], Musics.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_entities_1.Likes, likes => likes.music),
    __metadata("design:type", likes_entities_1.Likes)
], Musics.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => playlists_entities_1.Playlists, playlists => playlists.musics),
    __metadata("design:type", Array)
], Musics.prototype, "playlists", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entities_1.Users, performer => performer.musics),
    __metadata("design:type", users_entities_1.Users)
], Musics.prototype, "performer", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => users_entities_1.Users, performers => performers.feats),
    (0, typeorm_1.JoinTable)({
        name: "musicsFeats"
    }),
    __metadata("design:type", Array)
], Musics.prototype, "feats", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Musics.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Musics.prototype, "updatedAt", void 0);
Musics = __decorate([
    (0, typeorm_1.Entity)("musics")
], Musics);
exports.Musics = Musics;
