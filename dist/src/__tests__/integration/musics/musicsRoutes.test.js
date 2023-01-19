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
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = __importDefault(require("../../../data-source"));
const genres_entities_1 = require("../../../entities/genres.entities");
const musics_entities_1 = require("../../../entities/musics.entities");
const users_entities_1 = require("../../../entities/users.entities");
const mocks_1 = require("../../mocks");
describe("/musics", () => {
    let connection;
    let musicsRepo;
    let genreRepo;
    let usersRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
            musicsRepo = connection.getRepository(musics_entities_1.Musics);
            genreRepo = connection.getRepository(genres_entities_1.Genres);
            usersRepo = connection.getRepository(users_entities_1.Users);
        }).catch((error) => {
            console.error("Error during Data Source initialization", error);
        });
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const musics = yield musicsRepo.find();
        const genres = yield genreRepo.find();
        const users = yield usersRepo.find();
        yield musicsRepo.remove(musics);
        yield genreRepo.remove(genres);
        yield usersRepo.remove(users);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST User must be able to create a music", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        expect(response.body.name).toEqual("João Pedro mais conhecido como bola de fogo");
        expect(response.body.duration).toEqual("10:15");
        expect(response.body).toHaveProperty("genre");
        expect(response.body).toHaveProperty("feats");
        expect(response.status).toBe(201);
    }));
    test("POST User should not be able to create a music without authorization", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/musics").send(musicToBeCreated);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("POST User must be a performer to create a music", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("GET Must be able to list all musics", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const musicCreated = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        const response = yield (0, supertest_1.default)(app_1.default).get("/musics");
        expect(response.body[0].name).toEqual("João Pedro mais conhecido como bola de fogo");
        expect(response.body[0].duration).toEqual("10:15");
        expect(response.body[0]).toHaveProperty("isActive");
        expect(response.body[0]).toHaveProperty("updatedAt");
        expect(response.body[0]).toHaveProperty("createdAt");
        expect(response.status).toBe(200);
    }));
    test("GET Must be able to list all musics by performer", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "00:10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const musicCreated = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/musics/performer/${register.body.id}`);
        expect(response.body.name).toEqual("lucas");
        expect(response.body).toHaveProperty("musics");
        expect(response.status).toBe(200);
    }));
    test("GET Must be able to list all musics by genre", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const musicCreated = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/musics/genres/${createGenre.body.id}`);
        expect(response.body[0].name).toEqual("João Pedro mais conhecido como bola de fogo");
        expect(response.body[0].duration).toEqual("10:15");
        expect(response.body[0]).toHaveProperty("isActive");
        expect(response.body[0]).toHaveProperty("updatedAt");
        expect(response.body[0]).toHaveProperty("createdAt");
        expect(response.status).toBe(200);
    }));
    test("GET Must be able to list a music", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const musicCreated = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/musics/${musicCreated.body.id}`);
        expect(response.body.name).toEqual("João Pedro mais conhecido como bola de fogo");
        expect(response.body.duration).toEqual("10:15");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.status).toBe(200);
    }));
    test("GET Must be able to delete a music", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const musicCreated = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/musics/${musicCreated.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(204);
    }));
    test("PATCH Must be able to patch a music", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const register = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const musicCreated = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${login.body.token}`).send(musicToBeCreated);
        const musicToBeUpdated = {
            name: "João Pedro mais conhecido como bola de gelo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/musics/${musicCreated.body.id}`).set("Authorization", `Bearer ${login.body.token}`).send(musicToBeUpdated);
        expect(response.status).toBe(200);
    }));
});
