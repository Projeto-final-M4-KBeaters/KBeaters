"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
const genres_entities_1 = require("../../../entities/genres.entities");
describe("/genre", () => {
    let connection;
    let genresRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
            genresRepo = connection.getRepository(genres_entities_1.Genres);
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const genres = yield genresRepo.find();
        yield genresRepo.remove(genres);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /genres - should be able to create genre being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedGenrePost);
        expect(response.body.name).toEqual("forrozim");
        expect(response.body).toHaveProperty("id");
        expect(response.status).toBe(201);
    }));
    test("POST /genres - should not be able to create genre not being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedGenrePost);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("GET /genres - should be able to list all genres", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admim").send(mocks_1.mockedAdminRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminRegister);
        yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedGenrePost);
        const response = yield (0, supertest_1.default)(app_1.default).get("/genres");
        expect(response.body).toHaveLength(1);
    }));
    test("GET /genres - should be able to list a genre by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admim").send(mocks_1.mockedAdminRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminRegister);
        const genreData = yield (0, supertest_1.default)(app_1.default).post(`/genres/`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedGenrePost);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/genres/${genreData.body.id}`);
        expect(response.body.name).toEqual("forrozim");
        expect(response.body).toHaveProperty("id");
    }));
    test("GET /genres - should be able to list a genre by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admim").send(mocks_1.mockedAdminRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminRegister);
        const genreData = yield (0, supertest_1.default)(app_1.default).post(`/genres/`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedGenrePost);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/genres/forrozim`);
        expect(response.body.name).toEqual("forrozim");
        expect(response.body).toHaveProperty("id");
    }));
});
