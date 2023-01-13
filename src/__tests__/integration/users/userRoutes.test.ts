import { DataSource, Repository } from "typeorm";
import request from "supertest"
import AppDataSource from "../../../data-source";
import { mockedUserRegister } from "../../mocks/integration";
import app from "../../../app";
import { Users } from "../../../entities/users.entities";



describe("/users", () => {
  const baseUrl: string = "/users";
  let connection: DataSource;
  let userRepo: Repository<Users>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        connection = dataSource;
        userRepo = connection.getRepository(Users);
      })
      .catch((error) => console.error(error));
  });


  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRegister)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("isAdmin")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("isPerformer")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.name).toEqual("JP")
    expect(response.body.email).toEqual("jp@mail.com")
    expect(response.body.isAdmin).toEqual(false)
    expect(response.body.isActive).toEqual(true)
    expect(response.body.isPerformer).toEqual(false)
    expect(response.status).toBe(201)
  })

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRegister)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)

  })

//   test("GET /users -  Must be able to list users",async () => {
//     const response = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

//     expect(response.body).toHaveLength(2)
//     expect(response.body[0]).not.toHaveProperty("password")
 
// })

})