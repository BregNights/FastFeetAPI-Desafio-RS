import { DeleteRecipientUseCase } from "@/domain/carrier/application/use-cases/delete-recipient"
import { Role } from "@/domain/carrier/enterprise/entities/courier"
import { Roles } from "@/infra/auth/role"
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common"

@Controller("/recipients/:id")
@Roles(Role.ADMIN)
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(@Param("id") recipientId: string) {
    const result = await this.deleteRecipient.execute({
      recipientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
