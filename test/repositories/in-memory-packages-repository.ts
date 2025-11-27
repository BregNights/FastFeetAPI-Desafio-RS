import { Package } from "@/domain/entities/package"
import { PackagesRepository } from "@/domain/repositories/packages-repository"

export class InMemoryPackagesRepository implements PackagesRepository {
  public items: Package[] = []

  async create(pkg: Package): Promise<void> {
    this.items.push(pkg)
  }

  async findById(id: string): Promise<Package | null> {
    const pkg = this.items.find((item) => item.id.toString() === id)

    return pkg || null
  }

  async save(pkg: Package): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === pkg.id)

    this.items[itemIndex] = pkg
  }
}
