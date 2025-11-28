import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import {
  Recipient,
  RecipientProps,
} from "@/domain/carrier/enterprise/entities/recipient"
import { faker } from "@faker-js/faker"

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID
) {
  const recipient = Recipient.create(
    {
      address: faker.location.streetAddress(),
      name: faker.person.firstName(),
      cpf: faker.string.numeric(11),
      latitude: 0,
      longitude: 0,
      ...override,
    },
    id
  )

  return recipient
}
