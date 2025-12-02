import { RegisterRecipientUseCase } from "@/domain/carrier/application/use-cases/register-recipient"
import { Public } from "@/infra/auth/public"
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

const createRecipientBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  email: z.email(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@Controller("/recipients")
@Public()
export class CreateRecipientController {
  constructor(private registerRecipient: RegisterRecipientUseCase) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createRecipientBodySchema))
  async handle(@Body() body: CreateRecipientBodySchema) {
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
