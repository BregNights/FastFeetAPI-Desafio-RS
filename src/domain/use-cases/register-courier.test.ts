import { InMemoryCouriersRepository } from "test/repositories/in-memory-couriers-repository"
import { RegisterCourierUseCase } from "./register-courier"

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: RegisterCourierUseCase

describe("Create Courier", () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new RegisterCourierUseCase(inMemoryCouriersRepository)
  })

  it("should be able register a new courier", async () => {
    const result = await sut.execute({
      name: "example",
      cpf: "123;456;789-00",
      email: "example@example.com",
      password: "123",
    })

    expect(result.isRight()).toBe(true)
  })
})
