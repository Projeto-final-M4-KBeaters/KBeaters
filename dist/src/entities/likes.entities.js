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
exports.Likes = void 0;
const typeorm_1 = require("typeorm");
const musics_entities_1 = require("./musics.entities");
const users_entities_1 = require("./users.entities");
let Likes = class Likes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Likes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Likes.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Likes.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => musics_entities_1.Musics, musics => musics.likes),
    __metadata("design:type", musics_entities_1.Musics)
], Likes.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entities_1.Users, user => user.likeMusic),
    __metadata("design:type", users_entities_1.Users)
], Likes.prototype, "user", void 0);
Likes = __decorate([
    (0, typeorm_1.Entity)("likes")
], Likes);
exports.Likes = Likes;
