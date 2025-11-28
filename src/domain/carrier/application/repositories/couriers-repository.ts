import { Courier } from "../../enterprise/entities/courier"

export interface CouriersRepository {
  create(courier: Courier): Promise<void>
  findByEmail(email: string): Promise<Courier | null>
  findByCPF(cpf: string): Promise<Courier | null>
  findById(id: string): Promise<Courier | null>
  save(courier: Courier): Promise<void>
}
