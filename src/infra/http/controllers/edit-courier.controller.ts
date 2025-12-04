import { EditCourierUseCase } from "@/domain/carrier/application/use-cases/edit-courier"
import { Role } from "@/domain/carrier/enterprise/entities/courier"
import { Roles } from "@/infra/auth/role"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common"
import { z } from "zod"

const editCourierBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
})

type EditCourierBodySchema = z.infer<typeof editCourierBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editCourierBodySchema)

@Controller("/couriers/:courierId")
@Roles(Role.ADMIN)
export class EditCourierController {
  constructor(private editCourier: EditCourierUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCourierBodySchema,
    @Param("courierId") courierId: string
  ) {
    const { name, email, password } = body

    const result = await this.editCourier.execute({
      courierId,
      data: { name, email, password },
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
