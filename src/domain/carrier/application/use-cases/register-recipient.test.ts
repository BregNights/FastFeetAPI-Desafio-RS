import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { RegisterRecipientUseCase } from "./register-recipient"

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: RegisterRecipientUseCase

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
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
