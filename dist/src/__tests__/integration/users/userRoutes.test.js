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
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = __importDefault(require("../../../data-source"));
const integration_1 = require("../../mocks/integration");
const app_1 = __importDefault(require("../../../app"));
const users_entities_1 = require("../../../entities/users.entities");
describe("/users", () => {
    const baseUrl = "/users";
    let connection;
    let userRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((dataSource) => {
            connection = dataSource;
            userRepo = connection.getRepository(users_entities_1.Users);
        })
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userRepo.find();
        yield userRepo.remove(users);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /users -  Must be able to create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserRegister);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("isAdmin");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("isPerformer");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.name).toEqual("JP");
        expect(response.body.email).toEqual("jp@mail.com");
        expect(response.body.isAdmin).toEqual(false);
        expect(response.body.isActive).toEqual(true);
        expect(response.body.isPerformer).toEqual(false);
        expect(response.status).toBe(201);
    }));
    test("POST /users -  should not be able to create a user that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserRegister);
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserRegister);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    }));
    test("GET /users -  Must be able to list users", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedPerformerRegister);
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserRegister);
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).not.toHaveProperty("password");
    }));
    test("GET /users/performer -  Must be able to list performers", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedPerformerRegister);
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserRegister);
        const response = yield (0, supertest_1.default)(app_1.default).get(`${baseUrl}/performer`);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].isPerformer).toEqual(true);
        expect(response.body[0]).not.toHaveProperty("password");
    }));
    test("GET /users/:id -  Must be able to list a user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedPerformerRegister);
        const userTobeListed = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserRegister);
        const response = yield (0, supertest_1.default)(app_1.default).get(`${baseUrl}/${userTobeListed.body.id}`);
        expect(response.body.id).toEqual(userTobeListed.body.id);
        expect(response.body.name).toEqual("JP");
        expect(response.body.email).toEqual("jp@mail.com");
        expect(response.body).not.toHaveProperty("password");
    }));
    test("PATCH /users/reactivate -  should not be able to reactivate a user that already is Active", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedInactiveRegister);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`${baseUrl}/reactivate`).send(integration_1.mockedInactiveRegister);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    }));
    test("PATCH /users/reactivate -  should not be able to reactivate a user without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTobedeleted = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedInactiveRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(integration_1.mockedInactiveRegister);
        const userDeletado = yield (0, supertest_1.default)(app_1.default).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}s`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`${baseUrl}/reactivate`).send(integration_1.mockedInactiveRegister);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    }));
    test("PATCH /users/reactivate -  Must be able to reactivate a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTobedeleted = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedInactiveRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(integration_1.mockedInactiveRegister);
        const userDeletado = yield (0, supertest_1.default)(app_1.default).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`${baseUrl}/reactivate`).send(integration_1.mockedInactiveRegister);
        expect(response.body.name).toEqual("lucas");
        expect(response.body.email).toEqual("schmitao@mail.com");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.isActive).toEqual(true);
    }));
    test("DELETE /users/:id -  should not be able to delete a user without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTobedeleted = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedInactiveRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(integration_1.mockedInactiveRegister);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}s`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/:id -  should not be able to delete a user that is already deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTobedeleted = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedInactiveRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(integration_1.mockedInactiveRegister);
        yield (0, supertest_1.default)(app_1.default).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    }));
    test("DELETE /users/:id -  Must be able to delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTobedeleted = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedInactiveRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(integration_1.mockedInactiveRegister);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${baseUrl}/${userTobedeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(204);
    }));
});
