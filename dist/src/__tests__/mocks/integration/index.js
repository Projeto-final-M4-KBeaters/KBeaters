"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedPatchAlbum = exports.mockedPerformerRegisterFake = exports.mockedAlbumPost = exports.mockedInvalidUUID = exports.mockedPerformerRegister = exports.mockedAdminRegister = exports.mockedUserRegister = exports.mockedUserLogin = exports.mockedPerformerLogin = exports.mockedInactiveRegister = exports.mockedGenrePost = exports.mockedAdminLogin = void 0;
const mockedUserRegister = {
    name: "JP",
    email: "jp@mail.com",
    password: "123456",
    isPerformer: false,
};
exports.mockedUserRegister = mockedUserRegister;
const mockedAdminRegister = {
    name: "igordelas",
    email: "igordelas@mail.com",
    password: "123456",
    isPerformer: false
};
exports.mockedAdminRegister = mockedAdminRegister;
const mockedPerformerRegister = {
    name: "lucas",
    email: "schmitao@mail.com",
    password: "123456",
    isPerformer: true
};
exports.mockedPerformerRegister = mockedPerformerRegister;
const mockedPerformerRegisterFake = {
    name: "jp",
    email: "jp@mail.com",
    password: "123456",
    isPerformer: true
};
exports.mockedPerformerRegisterFake = mockedPerformerRegisterFake;
const mockedInactiveRegister = {
    name: "lucas",
    email: "schmitao@mail.com",
    password: "123456",
    isPerformer: false
};
exports.mockedInactiveRegister = mockedInactiveRegister;
const mockedUserLogin = {
    email: "jp@mail.com",
    password: "123456"
};
exports.mockedUserLogin = mockedUserLogin;
const mockedAdminLogin = {
    email: "igordelas@mail.com",
    password: "123456"
};
exports.mockedAdminLogin = mockedAdminLogin;
const mockedPerformerLogin = {
    email: "schmitao@mail.com",
    password: "123456"
};
exports.mockedPerformerLogin = mockedPerformerLogin;
const mockedGenrePost = {
    name: "forrozim"
};
exports.mockedGenrePost = mockedGenrePost;
const mockedInvalidUUID = "123e4567-e89b-12d3-a456-426614174000";
exports.mockedInvalidUUID = mockedInvalidUUID;
const mockedAlbumPost = {
    name: "Festinha na piscina"
};
exports.mockedAlbumPost = mockedAlbumPost;
const mockedPatchAlbum = {
    name: "Sem Festas Hoje"
};
exports.mockedPatchAlbum = mockedPatchAlbum;
