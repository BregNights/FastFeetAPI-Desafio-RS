import { makeRecipient } from "test/factories/make-recipient"
import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { FetchRecipientsUseCase } from "./fetch-recipients"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let inMemoryPackagesRepository: InMemoryPackagesRepository
let sut: FetchRecipientsUseCase

describe("Fetch Recipient Use Case", () => {
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
    sut = new FetchRecipientsUseCase(inMemoryRecipientsRepository)
  })

  it("should be able to fetch recipient", async () => {
    for (let i = 1; i <= 22; i++) {
      const recipient = makeRecipient()
      inMemoryRecipientsRepository.items.push(recipient)
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.recipients).toHaveLength(20)
  })

  it("should be able to fetch paginated recipient", async () => {
    for (let i = 1; i <= 22; i++) {
      const recipient = makeRecipient()
      inMemoryRecipientsRepository.items.push(recipient)
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.recipients).toHaveLength(2)
  })
})
