import { Either, right } from "@/core/either"
import { Injectable } from "@nestjs/common"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientsRepository } from "../repositories/recipients-repository"

interface FetchRecipientUseCaseRequest {
  page: number
}

type FetchRecipientUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[]
  }
>

@Injectable()
export class FetchRecipientsUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    page,
  }: FetchRecipientUseCaseRequest): Promise<FetchRecipientUseCaseResponse> {
    const recipients = await this.recipientsRepository.findManyRecipients(page)

    return right({ recipients })
  }
}
