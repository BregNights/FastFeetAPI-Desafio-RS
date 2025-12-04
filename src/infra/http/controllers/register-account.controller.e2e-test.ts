import { AppModule } from "@/app.module"
import { Role } from "@/domain/carrier/enterprise/entities/courier"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { CourierFactory } from "test/factories/make-courier"
import { DatabaseModule } from "../../database/database.module"

describe("Register account (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService
  let courierFactory: CourierFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    courierFactory = moduleRef.get(CourierFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it("[POST] /accounts", async () => {
    const userAdmin = await courierFactory.makePrismaCourier()
    const accessToken = jwt.sign({
      sub: userAdmin.id.toString(),
      role: Role.ADMIN,
    })

    const response = await request(app.getHttpServer())
      .post("/accounts")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        cpf: "123.456.789-00",
        password: "123456",
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        email: "johndoe@example.com",
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
