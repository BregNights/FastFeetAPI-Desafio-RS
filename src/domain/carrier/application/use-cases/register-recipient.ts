import { Either, right } from "@/core/either"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientsRepository } from "../repositories/recipients-repository"

interface RegisterRecipientUseCaseRequest {
  name: string
  cpf: string
  phone: string
  email: string
  address: string
  latitude: number
  longitude: number
}

type RegisterRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient
  }
>

export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientsRepository) {}

  async execute({
    name,
    cpf,
    phone,
    email,
    address,
    latitude,
    longitude,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      cpf,
      phone,
      email,
      address,
      latitude,
      longitude,
    })

    await this.recipientRepository.create(recipient)

    return right({ recipient })
  }
}
