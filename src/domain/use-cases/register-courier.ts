import { Courier } from "../entities/courier"
import { CouriersRepository } from "../repositories/couriers-repository"

interface RegisterCourierUseCaseRequest {
  name: string
  cpf: string
  email: string
}

export class RegisterCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute({ name, cpf, email }: RegisterCourierUseCaseRequest) {
    const courier = Courier.create({ name, cpf, email })

    await this.couriersRepository.create(courier)

    return courier
  }
}
