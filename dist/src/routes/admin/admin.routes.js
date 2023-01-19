"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerAdmin_controller_1 = __importDefault(require("../../controllers/admin/registerAdmin.controller"));
const middlewares_1 = require("../../middlewares");
const admin_1 = require("../../serializers/admin");
const adminRoutes = (0, express_1.Router)();
adminRoutes.post("", (0, middlewares_1.ensureDataIsValidMiddleware)(admin_1.adminRequestSerializer), middlewares_1.ensureEmailNotExistsMiddleware, registerAdmin_controller_1.default);
exports.default = adminRoutes;
