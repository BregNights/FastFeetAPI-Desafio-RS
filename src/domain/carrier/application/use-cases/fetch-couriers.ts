import { Either, right } from "@/core/either"
import { Courier } from "../../enterprise/entities/courier"
import { CouriersRepository } from "../repositories/couriers-repository"

interface FetchCouriersUseCaseRequest {
  page: number
}

type FetchCouriersUseCaseResponse = Either<
  null,
  {
    couriers: Courier[]
  }
>

export class FetchCouriersUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute({
    page,
  }: FetchCouriersUseCaseRequest): Promise<FetchCouriersUseCaseResponse> {
    const couriers = await this.couriersRepository.findManyCouriers(page)

    return right({ couriers })
  }
}
