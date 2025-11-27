import { randomUUID } from "node:crypto"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { RegisterPackageUseCase } from "./register-package"

let inMemoryPackagesRepository: InMemoryPackagesRepository
let sut: RegisterPackageUseCase

describe("Create Package", () => {
  beforeEach(() => {
    inMemoryPackagesRepository = new InMemoryPackagesRepository()
    sut = new RegisterPackageUseCase(inMemoryPackagesRepository)
  })

  it("should be able register a package", async () => {
    const result = await sut.execute({
      courierId: "1",
      description: "Package",
      recipientId: "2",
      trackingCode: randomUUID(),
    })

    expect(result.isRight()).toBe(true)
  })
})
