import { RecipientsRepository } from "@/domain/carrier/application/repositories/recipients-repository"
import { Recipient } from "@/domain/carrier/enterprise/entities/recipient"

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }
}
