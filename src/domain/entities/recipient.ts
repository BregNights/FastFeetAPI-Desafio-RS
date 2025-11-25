import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface RecipientProps {
  name: string
  cpf: string
  phone: string
  email: string
  address: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt?: Date | null
  packageId: UniqueEntityID
  courierId: UniqueEntityID
}

export class Recipient extends Entity<RecipientProps> {
  static create(
    props: Optional<RecipientProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return recipient
  }

  // get name() {
  //   return this.props.name
  // }

  // get cpf() {
  //   return this.props.cpf
  // }

  // get email() {
  //   return this.props.email
  // }

  // get packageId() {
  //   return this.props.packageId
  // }

  // get courierId() {
  //   return this.props.courierId
  // }
}
