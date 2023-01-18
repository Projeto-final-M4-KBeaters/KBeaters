import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import request from "supertest"
import AppDataSource from "../../../data-source";
import { Albums } from "../../../entities/albuns.entities"
import { mockedAdminLogin, mockedAdminRegister, mockedAlbumPost, mockedGenrePost, mockedInvalidUUID, mockedPerformerLogin, mockedPerformerRegister, mockedUserLogin, mockedUserRegister } from "../../mocks";
import { Users } from "../../../entities/users.entities";
import { Musics } from "../../../entities/musics.entities";
import { Genres } from "../../../entities/genres.entities";
import { IMusicRequest } from "../../../interfaces/musics";
import { response } from "express";
import { IPlaylistAddOrRemoveMusicRequest } from "../../../interfaces/playlists";

describe("/albums", () => {
    let connection : DataSource;
    let albumsRepo: Repository<Albums>;
    let userRepo: Repository<Users>;
    let musicsRepo: Repository<Musics>;
    let genreRepo: Repository<Genres>;


    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
            albumsRepo = connection.getRepository(Albums);
            userRepo = connection.getRepository(Users);
            musicsRepo = connection.getRepository(Musics);
            genreRepo = connection.getRepository(Genres);


        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    });


    beforeEach(async () => {
        const albums = await albumsRepo.find();
        await albumsRepo.remove(albums)
        const users = await userRepo.find();
        await userRepo.remove(users);
        const genres = await genreRepo.find();
        await genreRepo.remove(genres);
        const musics = await musicsRepo.find();
        await musicsRepo.remove(musics);


    });

    afterAll(async() => {
        await connection.destroy()     
    });

    test("POST /albums - should be able to create album", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const response = await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)
        
        expect(response.body.name).toEqual("Festinha na piscina")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("duration")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("performer")
        expect(response.body.performer.name).toEqual("lucas")
        expect(response.status).toBe(201)
    })

    test("POST /albums - should not be able to create album if not performer", async () => {
        await request(app).post("/users").send(mockedUserRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)

        const response = await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("GET /albums - should be able to list all albums", async () => {

        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)
        
        const response = await request(app).get("/albums").send()

        expect(response.body).toHaveProperty("map")
        expect(response.status).toBe(200)
        
    })

    test("GET /albums - should be able to list a unique album by id", async () => {
       await request(app).post("/users").send(mockedPerformerRegister)

       const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

       const album = await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

       const response = await request(app).get(`/albums/${album.body.id}`).send()

       expect(response.body.id).toEqual(album.body.id)
       expect(response.status).toBe(200)
       
    })

    test("GET /albums - should not be able to list a unique album by invalid UUID", async () => {
     

        await request(app).post("/users").send(mockedPerformerRegister)

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        const response = await request(app).get(`/albums/${"notUUID"}`).send()
 
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
     })

     test("GET /albums - should not be able to list a unique album by don't exists", async () => {

        const response = await request(app).get(`/albums/${mockedInvalidUUID}`).send()
 
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     })

     test("GET /albums - should be able to list all albums of Performer by id", async () => {

        const createUserPerformer = await request(app).post("/users").send(mockedPerformerRegister)
       

        const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

        await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)
        
        const response = await request(app).get(`/albums/performer/${createUserPerformer.body.id}`).send()

        console.log(response.body)

        expect(response.body.id).toEqual(createUserPerformer.body.id)
        expect(response.status).toBe(200)
        
    })

    test("GET /albums - should not be able to list all albums of Performer by invalid UUID", async () => {
        
        const response = await request(app).get(`/albums/performer/${"invalidUUID"}`).send()

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
        
    })

    test("GET /albums - should not be able to list all albums of not Performer", async () => {
        
        const response = await request(app).get(`/albums/performer/${mockedInvalidUUID}`).send()

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /albums - should be able to add music in album", async () => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
    

        expect(addMusicAlbum.body.musics[0].id).toEqual(idMusicToAdd.id)
        expect(addMusicAlbum.body.musics).toHaveLength(1)
        expect(addMusicAlbum.status).toBe(201)
    })

    test("POST /albums - should not be able to add Music with invalid Album Id", async() => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createMusic.body.id
        }

        const addMusicAlbum = await request(app).post(`/albums/add/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlbum.body).toHaveProperty("message")
        expect(addMusicAlbum.status).toBe(409)
    })

    test("POST /albums - should not be able to add Music with invalid Music Id", async() => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: "invalidUUID"
        }

        const addMusicAlbum = await request(app).post(`/albums/add/${"notUUID"}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlbum.body).toHaveProperty("message")
        expect(addMusicAlbum.status).toBe(409)
    })

    test("POST /albums - should not be able to add Music that already exists", async() => {
        await request(app).post("/users").send(mockedPerformerRegister)

        const userPerfomerResponse = await request(app).post("/login").send(mockedPerformerLogin)

        const createAlbum = await request(app).post("/albums").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(mockedAlbumPost)

        const createUserAdmim = await request(app).post("/admin").send(mockedAdminRegister)
        const userAdmLogin = await request(app).post("/login").send(mockedAdminLogin);
        const createGenre = await request(app).post("/genres").set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedGenrePost)

        const musicToBeCreated: IMusicRequest = {
            name: "João Pedro mais conhecido como bola de fogo",
            duration: "10:15",
            genreId: createGenre.body.id,
            featsId: []
        }

        const createMusic = await request(app).post("/musics").set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(musicToBeCreated)

        const idMusicToAdd: IPlaylistAddOrRemoveMusicRequest = {
            id: createGenre.body.id
        }

        const addMusicAlbum = await request(app).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)
        const addMusicAlreadyAlbum = await request(app).post(`/albums/add/${createAlbum.body.id}`).set("Authorization", `Bearer ${userPerfomerResponse.body.token}`).send(idMusicToAdd)

        expect(addMusicAlreadyAlbum.body).toHaveProperty("message")
        expect(addMusicAlreadyAlbum.status).toBe(409)
    })

})