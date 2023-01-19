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
exports.Albums = void 0;
const typeorm_1 = require("typeorm");
const musics_entities_1 = require("./musics.entities");
const users_entities_1 = require("./users.entities");
let Albums = class Albums {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Albums.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Albums.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time", default: "00:00:00" }),
    __metadata("design:type", String)
], Albums.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Albums.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => musics_entities_1.Musics, musics => musics.albums),
    (0, typeorm_1.JoinTable)({
        name: "albumsToMusics"
    }),
    __metadata("design:type", Array)
], Albums.prototype, "musics", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entities_1.Users, performer => performer.albums),
    __metadata("design:type", users_entities_1.Users)
], Albums.prototype, "performer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Albums.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Albums.prototype, "updatedAt", void 0);
Albums = __decorate([
    (0, typeorm_1.Entity)("albums")
], Albums);
exports.Albums = Albums;
