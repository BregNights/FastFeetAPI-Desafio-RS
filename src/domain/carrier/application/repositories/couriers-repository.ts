import { Courier } from "../../enterprise/entities/courier"

export interface CouriersRepository {
  create(courier: Courier): Promise<void>
  findByEmail(email: string): Promise<Courier | null>
  findByCPF(cpf: string): Promise<Courier | null>
  findById(id: string): Promise<Courier | null>
  findManyCouriers(page: number): Promise<Courier[]>
  save(courier: Courier): Promise<void>
}
