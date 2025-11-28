import { Recipient } from "../../enterprise/entities/recipient"

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface RecipientsRepository {
  create(recipient: Recipient): Promise<void>
  findManyNearby(params: FindManyNearbyParams): Promise<Recipient[]>
}
