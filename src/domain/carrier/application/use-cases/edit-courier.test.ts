import { FakeHasher } from "test/cryptography/fake-hasher"
import { makeCourier } from "test/factories/make-courier"
import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { EditCourierUseCase } from "./edit-courier"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let fakeHasher: FakeHasher
let sut: EditCourierUseCase

describe("edit courier", () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    fakeHasher = new FakeHasher()
    sut = new EditCourierUseCase(inMemoryCouriersRepository, fakeHasher)
  })

  it("should be able to edit a courier.", async () => {
    const courier = makeCourier()

    inMemoryCouriersRepository.items.push(courier)

    await sut.execute({
      courierId: courier.id.toString(),
      data: {
        name: "John Doe",
        password: "123456",
      },
    })

    const fakeHashedPassword = await fakeHasher.hash("123456")

    expect(inMemoryCouriersRepository.items[0]).toMatchObject({
      name: "John Doe",
      password: fakeHashedPassword,
    })
  })
})
