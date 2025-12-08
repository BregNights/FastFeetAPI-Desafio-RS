import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { RegisterRecipientUseCase } from "./register-recipient"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let inMemoryPackagesRepository: InMemoryPackagesRepository
let sut: RegisterRecipientUseCase

describe("Create Recipient", () => {
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
    sut = new RegisterRecipientUseCase(inMemoryRecipientsRepository)
  })

  it("should be able register a recipient", async () => {
    const result = await sut.execute({
      name: "Recipient",
      cpf: "123.456.789-00",
      address: "address",
      email: "example@email.com",
      latitude: 0,
      longitude: 0,
      phone: "123123123",
    })

    expect(result.isRight()).toBe(true)
  })
})
