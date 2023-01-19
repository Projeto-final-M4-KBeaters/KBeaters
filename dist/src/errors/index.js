"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
require("express-async-errors");
const yup_1 = require("yup");
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppError = AppError;
const handleError = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof yup_1.ValidationError) {
        return res.status(400).json({ message: err.errors });
    }
    return res.status(500).send({ message: err.message });
};
exports.handleError = handleError;
