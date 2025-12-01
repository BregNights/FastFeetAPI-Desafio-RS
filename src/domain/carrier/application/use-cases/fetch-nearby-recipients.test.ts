import { makeRecipient } from "test/factories/make-recipient"
import { InMemoryRecipientsRepository } from "test/repositories/in-memory-recipients-repository"
import { FetchNearbyRecipientsUseCase } from "./fetch-nearby-recipients"

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: FetchNearbyRecipientsUseCase

describe("Fetch Nearby Recipients Use Case", () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new FetchNearbyRecipientsUseCase(inMemoryRecipientsRepository)
  })

  it("should be able to fetch nearby recipients", async () => {
    const recipientNear = makeRecipient({
      name: "Near Recipient",
      latitude: -26.8471511,
      longitude: -49.0896057,
    })

    inMemoryRecipientsRepository.items.push(recipientNear)

    const recipientFar = makeRecipient({
      name: "Far Recipient",
      latitude: -26.8872718,
      longitude: -48.6939692,
    })

    inMemoryRecipientsRepository.items.push(recipientFar)

    const result = await sut.execute({
      courierLatitude: -26.8471511,
      courierLongitude: -49.0896057,
    })

    expect(result.value?.recipients).toHaveLength(1)
    expect(result.value?.recipients).toEqual([
      expect.objectContaining({ name: "Near Recipient" }),
    ])
  })
})
