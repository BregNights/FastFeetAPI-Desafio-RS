import { makePackage } from "test/factories/make-package"
import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { PackageStatus } from "../../enterprise/entities/package"
import { EditPackageUseCase } from "./edit-package"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let inMemoryPackagesRepository: InMemoryPackagesRepository
let sut: EditPackageUseCase

describe("Edit Package", () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryCouriersRepository,
      inMemoryPackagesRepository
    )
    inMemoryPackagesRepository = new InMemoryPackagesRepository(
      inMemoryCouriersRepository,
      inMemoryRecipientsRepository
    )
    sut = new EditPackageUseCase(inMemoryPackagesRepository)
  })

  it("should be able to edit a package", async () => {
    const pkg = makePackage({})

    inMemoryPackagesRepository.items.push(pkg)

    await sut.execute({
      packageId: pkg.id.toString(),
      courierId: "1",
      data: {
        description: "new description",
        status: PackageStatus.PICKED_UP,
      },
    })

    expect(inMemoryPackagesRepository.items[0]).toMatchObject({
      description: "new description",
      status: "PICKED_UP",
    })
  })
})
