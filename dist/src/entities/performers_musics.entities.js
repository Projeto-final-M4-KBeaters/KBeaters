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
exports.PerformersToMusics = void 0;
const typeorm_1 = require("typeorm");
const musics_entities_1 = require("./musics.entities");
const users_entities_1 = require("./users.entities");
let PerformersToMusics = class PerformersToMusics {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PerformersToMusics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => musics_entities_1.Musics, musics => musics.performerToMusics),
    __metadata("design:type", musics_entities_1.Musics)
], PerformersToMusics.prototype, "musics", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entities_1.Users, owner => owner.musics),
    __metadata("design:type", users_entities_1.Users)
], PerformersToMusics.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entities_1.Users, feat => feat.featMusics, { nullable: true }),
    __metadata("design:type", Array)
], PerformersToMusics.prototype, "feat", void 0);
PerformersToMusics = __decorate([
    (0, typeorm_1.Entity)("performersToMusics")
], PerformersToMusics);
exports.PerformersToMusics = PerformersToMusics;
