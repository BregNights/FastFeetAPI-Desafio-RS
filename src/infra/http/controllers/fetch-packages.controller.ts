import { FetchPackagesUseCase } from "@/domain/carrier/application/use-cases/fetch-packages"
import { CurrentUser } from "@/infra/auth/current-user-decorator"
import type { UserPayload } from "@/infra/auth/jwt.strategy"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from "@nestjs/common"
import { z } from "zod"
import { PackagePresenter } from "../presenters/package-presenter"

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/packages/:courierId")
export class FetchPackagesController {
  constructor(private fetchPackage: FetchPackagesUseCase) {}

  @Get()
  async handle(
    @Query("page", queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
    @Param("courierId") courierId: string
  ) {
    const result = await this.fetchPackage.execute({
      page,
      courierId,
      requesterId: user.sub,
      requesterRole: user.role,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const pkgs = result.value.pkgs

    return { package: pkgs.map(PackagePresenter.toHTTP) }
  }
}
