import { Package } from "../entities/package"

export interface PackagesRepository {
  create(pkg: Package): Promise<void>
  findById(id: string): Promise<Package | null>
  save(pkg: Package): Promise<void>
}
