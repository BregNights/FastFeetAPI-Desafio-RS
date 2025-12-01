import { makePackage } from "test/factories/make-package"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
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
    for (let i = 1; i <= 22; i++) {
      const pkg = makePackage()
      inMemoryPackagesRepository.items.push(pkg)
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.pkg).toHaveLength(20)
  })

  it("should be able to fetch paginated packages", async () => {
    for (let i = 1; i <= 22; i++) {
      const pkg = makePackage()
      inMemoryPackagesRepository.items.push(pkg)
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.pkg).toHaveLength(2)
  })
})
