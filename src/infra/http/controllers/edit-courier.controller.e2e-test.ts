import { AppModule } from "@/app.module"
import { HashComparer } from "@/domain/carrier/application/cryptography/hash-comparer"
import { Role } from "@/domain/carrier/enterprise/entities/courier"
import { CryptographyModule } from "@/infra/cryptography/cryptography.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { CourierFactory } from "test/factories/make-courier"
import { DatabaseModule } from "../../database/database.module"

describe("Edit courier (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService
  let courierFactory: CourierFactory
  let hashComparer: HashComparer
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CryptographyModule],
      providers: [CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    courierFactory = moduleRef.get(CourierFactory)
    hashComparer = moduleRef.get(HashComparer)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it("[PUT] /couriers/:courierId", async () => {
    const userAdmin = await courierFactory.makePrismaCourier()
    const accessToken = jwt.sign({
      sub: userAdmin.id.toString(),
      role: Role.ADMIN,
    })

    const user = await courierFactory.makePrismaCourier()
    const userId = user.id.toString()

    const newPassword = "NewPassword"

    const response = await request(app.getHttpServer())
      .put(`/couriers/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "John Doe",
        email: "johndoe@mail.com",
        password: newPassword,
      })

    expect(response.statusCode).toBe(204)

    const courierOnDatabase = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    expect(courierOnDatabase).toEqual(
      expect.objectContaining({ name: "John Doe" })
    )

    const isValid = await hashComparer.compare(
      newPassword,
      courierOnDatabase!.password
    )

    expect(isValid).toBe(true)
  })
})
