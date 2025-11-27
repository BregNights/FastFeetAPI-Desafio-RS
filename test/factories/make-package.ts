import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Package, PackageProps } from "@/domain/entities/package"
import { faker } from "@faker-js/faker"

export function makePackage(
  override: Partial<PackageProps> = {},
  id?: UniqueEntityID
) {
  const tracking =
    "PKG-" + faker.string.alphanumeric({ length: 10, casing: "upper" })
  const pkg = Package.create(
    {
      courierId: new UniqueEntityID(),
      description: faker.lorem.text(),
      recipientId: new UniqueEntityID(),
      trackingCode: tracking,
      ...override,
    },
    id
  )

  return pkg
}
