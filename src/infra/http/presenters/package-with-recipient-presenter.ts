import { PackageDetails } from "@/domain/carrier/enterprise/entities/value-objects/package-details"

export class PackageWithRecipientPresenter {
  static toHTTP(packageithRecipient: PackageDetails) {
    return {
      packageId: packageithRecipient.packageId.toString(),
      trackingCode: packageithRecipient.trackingCode,
      description: packageithRecipient.description,
      status: packageithRecipient.status,
      recipientId: packageithRecipient.recipientId,
      recipientName: packageithRecipient.recipientName,
      recipientPhone: packageithRecipient.recipientPhone,
      recipientAddress: packageithRecipient.recipientAddress,
      createdAt: packageithRecipient.createdAt,
      updateAt: packageithRecipient.updatedAt,
    }
  }
}
