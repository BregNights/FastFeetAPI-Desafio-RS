import { makeRecipient } from "test/factories/make-recipient"
import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { InMemoryPackagesRepository } from "test/repositories/in-memory-packages-repository"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { EditRecipientUseCase } from "./edit-recipient"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let inMemoryPackagesRepository: InMemoryPackagesRepository
let sut: EditRecipientUseCase

describe("Edit Recipient", () => {
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
    sut = new EditRecipientUseCase(inMemoryRecipientsRepository)
  })

  it("should be able to edit a recipient", async () => {
    const recipient = makeRecipient({ name: "example" })

    inMemoryRecipientsRepository.items.push(recipient)

    await sut.execute({
      recipientId: recipient.id.toString(),
      data: {
        name: "John Doe",
      },
    })

    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      name: "John Doe",
    })
  })
})
