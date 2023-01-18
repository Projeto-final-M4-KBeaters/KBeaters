import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import request from "supertest"
import AppDataSource from "../../../data-source";
import { Albums } from "../../../entities/albuns.entities"
import { mockedAlbumPost, mockedInvalidUUID, mockedPerformerLogin, mockedPerformerRegister, mockedUserLogin, mockedUserRegister } from "../../mocks";

describe("/albums", () => {
    let connection : DataSource;
    let albumsRepo: Repository<Albums>;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
            albumsRepo = connection.getRepository(Albums)
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    });


    beforeEach(async () => {
        const albums = await albumsRepo.find();
        await albumsRepo.remove(albums)
    });

    afterAll(async() => {
        await connection.destroy()     
    });

    test("POST /albums - should be able to crate album", async () => {
        const createUserPerformer = await request(app).post("/users").send(mockedPerformerRegister)

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

    test("POST /albums - should not be able to crate album if not performer", async () => {
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

        console.log(response.body)

       expect(response.body.id).toEqual(album.body.id)
       expect(response.status).toBe(200)
       
    })

    test("GET /albums - should not be able to list a unique album by invalid id", async () => {
     

        await request(app).post("/users").send(mockedPerformerRegister)

       const userLoginResponse = await request(app).post("/login").send(mockedPerformerLogin)

       const album = await request(app).post("/albums").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedAlbumPost)

        const response = await request(app).get(`/albums/${"random"}`).send()
 
        console.log(response.body)
 
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
        
     })
})