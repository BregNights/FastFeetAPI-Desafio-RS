import { RegisterRecipientUseCase } from "@/domain/carrier/application/use-cases/register-recipient"
import { Role } from "@/domain/carrier/enterprise/entities/courier"
import { Roles } from "@/infra/auth/role"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common"
import { z } from "zod"

const registerRecipientBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  email: z.email(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type RegisterRecipientBodySchema = z.infer<typeof registerRecipientBodySchema>

@Controller("/recipients")
@Roles(Role.ADMIN)
export class RegisterRecipientController {
  constructor(private registerRecipient: RegisterRecipientUseCase) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerRecipientBodySchema))
  async handle(@Body() body: RegisterRecipientBodySchema) {
    const { name, cpf, phone, email, address, latitude, longitude } = body

    const result = await this.registerRecipient.execute({
      name,
      cpf,
      phone,
      email,
      address,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
