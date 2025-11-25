import { Courier } from "../entities/courier"

export interface CouriersRepository {
  create(courier: Courier): Promise<void>
}
