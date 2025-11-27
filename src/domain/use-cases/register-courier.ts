import { Either, left, right } from "@/core/either"
import { Courier } from "../entities/courier"
import { CouriersRepository } from "../repositories/couriers-repository"
import { CourierAlreadyExistsError } from "./errors/courier-already-exists-error"

interface RegisterCourierUseCaseRequest {
  name: string
  cpf: string
  email: string
  password: string
}

type RegisterCourierUseCaseResponse = Either<
  CourierAlreadyExistsError,
  {
    courier: Courier
  }
>

export class RegisterCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
  }: RegisterCourierUseCaseRequest): Promise<RegisterCourierUseCaseResponse> {
    const userWithSameEmail = await this.couriersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new CourierAlreadyExistsError(email))
    }

    const userWithSameCPF = await this.couriersRepository.findByCPF(cpf)

    if (userWithSameCPF) {
      throw left(new CourierAlreadyExistsError(cpf))
    }

    const courier = Courier.create({ name, cpf, email, password })

    await this.couriersRepository.create(courier)

    return right({ courier })
  }
}
