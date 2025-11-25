import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface PackageProps {
  trackingCode: string
  description: string
  recipientId: UniqueEntityID
  courierId: UniqueEntityID
  status?: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Package extends Entity<PackageProps> {
  static create(
    props: Optional<PackageProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const pkg = new Package(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return pkg
  }



  // get trackingCode() {
  //   return this.props.trackingCode
  // }

  // get description() {
  //   return this.props.description
  // }

  // get courierId() {
  //   return this.props.courierId
  // }
}