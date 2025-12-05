import { Either, left, right } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { Package, PackageStatus } from "../../enterprise/entities/package"
import { CouriersRepository } from "../repositories/couriers-repository"
import { PackagesRepository } from "../repositories/packages-repository"
import { CourierRequiredError } from "./errors/courier-required-error"
import { DeliveredWithoutPickedup } from "./errors/delivered-without-pickedup-error"
import { NotThePickupCourierError } from "./errors/not-pickup-courier-error"

interface EditPackageStatusUseCaseRequest {
  packageId: string
  courierId: string
  status: PackageStatus
}

type EditPackageStatusUseCaseResponse = Either<
  | ResourceNotFoundError
  | CourierRequiredError
  | DeliveredWithoutPickedup
  | NotThePickupCourierError,
  {
    pkg: Package
  }
>

@Injectable()
export class EditPackageStatusUseCase {
  constructor(
    private packagesRepository: PackagesRepository,
    private couriersRepository: CouriersRepository
  ) {}

  async execute({
    packageId,
    status,
    courierId,
  }: EditPackageStatusUseCaseRequest): Promise<EditPackageStatusUseCaseResponse> {
    const pkg = await this.packagesRepository.findById(packageId)
    if (!pkg) return left(new ResourceNotFoundError())

    const courier = await this.couriersRepository.findById(courierId)
    if (!courier) return left(new ResourceNotFoundError())

    if (status === PackageStatus.DELIVERED) {
      if (pkg.status !== PackageStatus.PICKED_UP) {
        return left(new DeliveredWithoutPickedup())
      }

      if (pkg.courierId?.toString() !== courierId) {
        return left(new NotThePickupCourierError())
      }
    }

    if (status === PackageStatus.PICKED_UP) {
      pkg.courierId = new UniqueEntityID(courierId)
    }

    pkg.status = status

    await this.packagesRepository.save(pkg)

    return right({ pkg })
  }
}
