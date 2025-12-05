import { makeCourier } from "test/factories/make-courier"
import { makePackage } from "test/factories/make-package"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { Role } from "../../enterprise/entities/courier"
import { FetchPackagesUseCase } from "./fetch-packages"

let inMemoryPackagesRepository: InMemoryPackagesRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: FetchPackagesUseCase

describe("Fetch Packages Use Case", () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    inMemoryPackagesRepository = new InMemoryPackagesRepository(
      inMemoryRecipientsRepository
    )
    sut = new FetchPackagesUseCase(inMemoryPackagesRepository)
  })

  it("should be able to fetch packages", async () => {
    const courier = makeCourier()

    for (let i = 1; i <= 22; i++) {
      const pkg = makePackage({ courierId: courier.id })
      inMemoryPackagesRepository.items.push(pkg)
    }

    const result = await sut.execute({
      courierId: courier.id.toString(),
      page: 1,
      requesterId: courier.id.toString(),
      requesterRole: Role.COURIER,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.pkgs).toHaveLength(20)
    }
  })

  it("should be able to fetch paginated packages", async () => {
    const courier = makeCourier()

    for (let i = 1; i <= 22; i++) {
      const pkg = makePackage({ courierId: courier.id })
      inMemoryPackagesRepository.items.push(pkg)
    }

    const result = await sut.execute({
      courierId: courier.id.toString(),
      page: 2,
      requesterId: courier.id.toString(),
      requesterRole: Role.ADMIN,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.pkgs).toHaveLength(2)
    }
  })
})
