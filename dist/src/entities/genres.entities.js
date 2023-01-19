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
exports.Genres = void 0;
const typeorm_1 = require("typeorm");
const musics_entities_1 = require("./musics.entities");
let Genres = class Genres {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Genres.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Genres.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => musics_entities_1.Musics, musics => musics.genre),
    __metadata("design:type", musics_entities_1.Musics)
], Genres.prototype, "musics", void 0);
Genres = __decorate([
    (0, typeorm_1.Entity)("genres")
], Genres);
exports.Genres = Genres;
