import { AppModule } from "@/app.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"

describe("Create recipient (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  it("[POST] /recipients", async () => {
    const response = await request(app.getHttpServer())
      .post("/recipients")
      .send({
        name: "John Doe",
        cpf: "123.456.789-00",
        phone: "4799999-9999",
        email: "johndoe@example.com",
        address: "Address example",
        latitude: 0,
        longitude: 0,
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.recipient.findUnique({
      where: {
        cpf: "123.456.789-00",
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
