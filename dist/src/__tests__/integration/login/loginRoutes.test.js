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
describe("/login", () => {
    const baseUrl = "/login";
    let connection;
    let userRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post('/users').send(integration_1.mockedUserRegister);
        yield (0, supertest_1.default)(app_1.default).post('/users').send(integration_1.mockedPerformerRegister);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /login -  should be able to login with the normal user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedUserLogin);
        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    }));
    test("POST /login -  should be able to login with the performer user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(integration_1.mockedPerformerLogin);
        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    }));
    test("POST /login -  should not be able to login with the user with incorrect password or email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/login").send({
            email: "schmitao@mai.com",
            password: "1234567"
        });
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
});
