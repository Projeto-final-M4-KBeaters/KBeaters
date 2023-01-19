"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const users_1 = require("../../serializers/users");
const loginRoutes = (0, express_1.Router)();
loginRoutes.post("", (0, middlewares_1.ensureDataIsValidMiddleware)(users_1.loginSerializer), controllers_1.createloginController);
exports.default = loginRoutes;
