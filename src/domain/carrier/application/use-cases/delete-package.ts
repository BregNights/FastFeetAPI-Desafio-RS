import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { PackagesRepository } from "../repositories/packages-repository"

interface DeletePackageUseCaseRequest {
  packageId: string
}

type DeletePackageUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeletePackageUseCase {
  constructor(private packagesRepository: PackagesRepository) {}

  async execute({
    packageId,
  }: DeletePackageUseCaseRequest): Promise<DeletePackageUseCaseResponse> {
    const pkg = await this.packagesRepository.findById(packageId)
    if (!pkg) return left(new ResourceNotFoundError())

    await this.packagesRepository.delete(pkg)

    return right(null)
  }
}
