import { Either, left, right } from "@/core/either"
import { Encrypter } from "../cryptography/encrypter"
import { HashComparer } from "../cryptography/hash-comparer"
import { Courier } from "../entities/courier"
import { CouriersRepository } from "../repositories/couriers-repository"
import { WrongCredentialsError } from "./errors/wrong-credentials-error"

type AuthenticateCourierUseCaseRequest =
  | {
      email: string
      password: string
    }
  | {
      cpf: string
      password: string
    }

type AuthenticateCourierUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateCourierUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute(
    request: AuthenticateCourierUseCaseRequest
  ): Promise<AuthenticateCourierUseCaseResponse> {
    let courier: Courier | null = null

    if ("email" in request) {
      courier = await this.couriersRepository.findByEmail(request.email)
    }

    if ("cpf" in request) {
      courier = await this.couriersRepository.findByCPF(request.cpf)
    }

    if (!courier) return left(new WrongCredentialsError())

    const isPasswordValid = await this.hashComparer.compare(
      request.password,
      courier.password
    )

    if (!isPasswordValid) return left(new WrongCredentialsError())

    const accessToken = await this.encrypter.encrypt({
      sub: courier.id.toString(),
    })

    return right({ accessToken })
  }
}
