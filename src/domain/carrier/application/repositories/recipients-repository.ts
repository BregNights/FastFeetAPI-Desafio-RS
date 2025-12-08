import { Recipient } from "../../enterprise/entities/recipient"

export interface FindManyNearbyCourierParams {
  latitude: number
  longitude: number
}

export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findById(id: string): Promise<Recipient | null>
  abstract findByCPF(cpf: string): Promise<Recipient | null>
  abstract findManyRecipients(page: number): Promise<Recipient[]>
  abstract findManyRecipientsNearbyCourier(
    courierId: string,
    params: FindManyNearbyCourierParams
  ): Promise<Recipient[]>
  abstract save(recipient: Recipient): Promise<void>
  abstract delete(recipient: Recipient): Promise<void>
}
