import { Package } from "../../enterprise/entities/package"
import { PackageDetails } from "../../enterprise/entities/value-objects/package-details"

export interface PackagesRepository {
  create(pkg: Package): Promise<void>
  findById(id: string): Promise<Package | null>
  findDetailsById(id: string): Promise<PackageDetails | null>
  findManyPackages(page: number): Promise<Package[]>
  save(pkg: Package): Promise<void>
}
