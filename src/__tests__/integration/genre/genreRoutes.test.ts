
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedGenrePost, mockedUserLogin } from "../../mocks"



describe("/genre", () => {
    let connection: DataSource


    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /genre - should not be able to create genre not being admin", async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const response = await request(app).post("/genre").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    // test("POST /genre - should not be able to create genre not being admin", async () => {
    //     const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
    //     const response = await request(app).post("/genre").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedGenrePost)

    //     expect(response.body).toHaveProperty("message")
    //     expect(response.status).toBe(403)
    // })

    test("GET /genre -  Must be able to list all genres",async () => {
      
        const response = await request(app).get('/genre')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

    test("GET /genre -  Must be able to list a genre",async () => {
      
        const response = await request(app).get('/genre/forrozim')
        expect(response.body.name).toEqual("forrozim")
        expect(response.status).toBe(200)
     
    })
    
})