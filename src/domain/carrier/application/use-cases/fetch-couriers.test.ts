import { makeCourier } from "test/factories/make-courier"
import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { FetchCouriersUseCase } from "./fetch-couriers"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: FetchCouriersUseCase

describe("Fetch Couriers Use Case", () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new FetchCouriersUseCase(inMemoryCouriersRepository)
  })

  it("should be able to fetch couriers", async () => {
    for (let i = 1; i <= 22; i++) {
      const courier = makeCourier()
      inMemoryCouriersRepository.items.push(courier)
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.couriers).toHaveLength(20)
  })

  it("should be able to fetch paginated couriers", async () => {
    for (let i = 1; i <= 22; i++) {
      const courier = makeCourier()
      inMemoryCouriersRepository.items.push(courier)
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.couriers).toHaveLength(2)
  })
})
