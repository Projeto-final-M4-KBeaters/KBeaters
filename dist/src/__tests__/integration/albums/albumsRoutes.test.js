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
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = __importDefault(require("../../../data-source"));
const albuns_entities_1 = require("../../../entities/albuns.entities");
const mocks_1 = require("../../mocks");
const users_entities_1 = require("../../../entities/users.entities");
const musics_entities_1 = require("../../../entities/musics.entities");
const genres_entities_1 = require("../../../entities/genres.entities");
describe("/albums", () => {
    let connection;
    let albumsRepo;
    let userRepo;
    let musicsRepo;
    let genreRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
            albumsRepo = connection.getRepository(albuns_entities_1.Albums);
            userRepo = connection.getRepository(users_entities_1.Users);
            musicsRepo = connection.getRepository(musics_entities_1.Musics);
            genreRepo = connection.getRepository(genres_entities_1.Genres);
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const musics = yield musicsRepo.find();
        yield musicsRepo.remove(musics);
        const albums = yield albumsRepo.find();
        yield albumsRepo.remove(albums);
        const genres = yield genreRepo.find();
        yield genreRepo.remove(genres);
        const users = yield userRepo.find();
        yield userRepo.remove(users);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /albums - should be able to create album", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        expect(response.body.name).toEqual("Festinha na piscina");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("duration");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("performer");
        expect(response.body.performer.name).toEqual("lucas");
        expect(response.status).toBe(201);
    }));
    test("POST /albums - should not be able to create album if not performer", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("GET /albums - should be able to list all albums", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const response = yield (0, supertest_1.default)(app_1.default).get("/albums").send();
        expect(response.body).toHaveProperty("map");
        expect(response.status).toBe(200);
    }));
    test("GET /albums - should be able to list a unique album by id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const album = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/albums/${album.body.id}`).send();
        expect(response.body.id).toEqual(album.body.id);
        expect(response.status).toBe(200);
    }));
    test("GET /albums - should not be able to list a unique album by invalid UUID", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/albums/${"notUUID"}`).send();
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    }));
    test("GET /albums - should not be able to list a unique album by don't exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/albums/${mocks_1.mockedInvalidUUID}`).send();
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
    test("GET /albums - should be able to list all albums of Performer by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserPerformer = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/albums/performer/${createUserPerformer.body.id}`).send();
        expect(response.body.id).toEqual(createUserPerformer.body.id);
        expect(response.status).toBe(200);
    }));
    test("GET /albums - should not be able to list all albums of Performer by invalid UUID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/albums/performer/${"invalidUUID"}`).send();
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    }));
    test("GET /albums - should not be able to list all albums of not Performer", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/albums/performer/${mocks_1.mockedInvalidUUID}`).send();
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /albums - should be able to add music in album", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        expect(addMusicAlbum.body.musics[0].id).toEqual(idMusicToAdd.id);
        expect(addMusicAlbum.body.musics).toHaveLength(1);
        expect(addMusicAlbum.status).toBe(201);
    }));
    test("POST /albums - should not be able to add Music with invalid Album Id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${"invalidUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        expect(addMusicAlbum.body).toHaveProperty("message");
        expect(addMusicAlbum.status).toBe(409);
    }));
    test("POST /albums - should not be able to add Music with not exists Album Id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${"invalidUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        expect(addMusicAlbum.body).toHaveProperty("message");
        expect(addMusicAlbum.status).toBe(409);
    }));
    test("POST /albums - should not be able to add Music with invalid Music Id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: "invalidUUID"
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        expect(addMusicAlbum.body).toHaveProperty("message");
        expect(addMusicAlbum.status).toBe(409);
    }));
    test("POST /albums - should not be able to add Music that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const addMusicAlreadyAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        expect(addMusicAlreadyAlbum.body).toHaveProperty("message");
        expect(addMusicAlreadyAlbum.status).toBe(409);
    }));
    test("POST /albums - should not be able to add Music without been the Owner", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegisterFake);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const userPerfomerResponseFake = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(idMusicToAdd);
        expect(addMusicAlbum.body).toHaveProperty("message");
        expect(addMusicAlbum.status).toBe(403);
    }));
    test("DELETE /albums - should be able to remove music from album", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const deleteMusicAlbum = yield (0, supertest_1.default)(app_1.default).delete(`/albums/remove/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const musicAlbum = yield (0, supertest_1.default)(app_1.default).get(`/albums/${createAlbum.body.id}`).send();
        expect(musicAlbum.body.musics).toHaveLength(0);
        expect(deleteMusicAlbum.status).toBe(204);
    }));
    test("DELETE /albums - should not be able to remove music from album with INVALID Album Id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const deleteMusicAlbum = yield (0, supertest_1.default)(app_1.default).delete(`/albums/remove/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const musicAlbum = yield (0, supertest_1.default)(app_1.default).get(`/albums/${createAlbum.body.id}`).send();
        expect(musicAlbum.body.musics).toHaveLength(1);
        expect(deleteMusicAlbum.body).toHaveProperty("message");
        expect(deleteMusicAlbum.status).toBe(409);
    }));
    test("DELETE /albums - should not be able to remove music from album with not exists album id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const addMusicAlbum = yield (0, supertest_1.default)(app_1.default).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const deleteMusicAlbum = yield (0, supertest_1.default)(app_1.default).delete(`/albums/remove/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd);
        const musicAlbum = yield (0, supertest_1.default)(app_1.default).get(`/albums/${createAlbum.body.id}`).send();
        expect(musicAlbum.body.musics).toHaveLength(1);
        expect(deleteMusicAlbum.body).toHaveProperty("message");
        expect(deleteMusicAlbum.status).toBe(409);
    }));
    test("DELETE /albums - should not be able to remove Music without been the Owner", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegisterFake);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const userPerfomerResponseFake = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const musicToBeCreated = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        };
        const createMusic = yield (0, supertest_1.default)(app_1.default).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated);
        const idMusicToAdd = {
            id: createMusic.body.id
        };
        const removeMusicAlbum = yield (0, supertest_1.default)(app_1.default).delete(`/albums/remove/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(idMusicToAdd);
        expect(removeMusicAlbum.body).toHaveProperty("message");
        expect(removeMusicAlbum.status).toBe(403);
    }));
    test("PATCH /albums - should be able to change the album name", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const changeAlbumName = yield (0, supertest_1.default)(app_1.default).patch(`/albums/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedPatchAlbum);
        expect(changeAlbumName.body.name).toEqual("Sem Festas Hoje");
        expect(changeAlbumName.status).toBe(200);
    }));
    test("PATCH /albums - should not be able to change the name without the correct Owner", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegisterFake);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const userPerfomerResponseFake = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const changeAlbumName = yield (0, supertest_1.default)(app_1.default).patch(`/albums/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(mocks_1.mockedPatchAlbum);
        expect(changeAlbumName.body).toHaveProperty("message");
        expect(changeAlbumName.status).toBe(400);
    }));
    test("PATCH /albums - should not be able to change album name with invalid UUID", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegister);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedPerformerRegisterFake);
        const userPerfomerResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedPerformerLogin);
        const userPerfomerResponseFake = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const createAlbum = yield (0, supertest_1.default)(app_1.default).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mocks_1.mockedAlbumPost);
        const createUserAdmim = yield (0, supertest_1.default)(app_1.default).post("/admin").send(mocks_1.mockedAdminRegister);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const createGenre = yield (0, supertest_1.default)(app_1.default).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedGenrePost);
        const changeAlbumName = yield (0, supertest_1.default)(app_1.default).patch(`/albums/${"NotUUID"}`).set("Authorization", `Bearer ${userPerfomerResponseFake.body.token}`).send(mocks_1.mockedPatchAlbum);
        expect(changeAlbumName.body).toHaveProperty("message");
        expect(changeAlbumName.status).toBe(409);
    }));
});
