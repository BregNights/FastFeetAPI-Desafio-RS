import { EditPackageUseCase } from "@/domain/carrier/application/use-cases/edit-package"
import { Role } from "@/domain/carrier/enterprise/entities/courier"
import { PackageStatus } from "@/domain/carrier/enterprise/entities/package"
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

const editPackageBodySchema = z.object({
  status: z.enum(PackageStatus),
  description: z.string().optional(),
  courierId: z.string(),
})

type EditPackageBodySchema = z.infer<typeof editPackageBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editPackageBodySchema)

@Controller("/packages/:packageId")
@Roles(Role.ADMIN)
export class EditPackageController {
  constructor(private editPackage: EditPackageUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditPackageBodySchema,
    @Param("packageId") packageId: string
  ) {
    const { status, description, courierId } = body

    const result = await this.editPackage.execute({
      packageId,
      courierId,
      data: { status, description },
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
