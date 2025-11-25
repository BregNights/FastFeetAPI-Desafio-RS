import { Package } from "../entities/package"

interface RegisterPackageUseCaseRequest {
  packageId: string
  description: string
  courierId: string
}

export class RegisterPackageUseCase {
  execute({ description, courierId }: RegisterPackageUseCaseRequest) {
    const package = new Package({ description, courierId })

    return package
  }
}
