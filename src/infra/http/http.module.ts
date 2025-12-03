import { AuthenticateCourierUseCase } from "@/domain/carrier/application/use-cases/authenticate-courier"
import { RegisterCourierUseCase } from "@/domain/carrier/application/use-cases/register-courier"
import { RegisterRecipientUseCase } from "@/domain/carrier/application/use-cases/register-recipient"
import { Module } from "@nestjs/common"
import { CryptographyModule } from "../cryptography/cryptography.module"
import { AuthenticateController } from "./controllers/authenticate.controller"
import { RegisterAccountController } from "./controllers/register-account.controller"
import { RegisterRecipientController } from "./controllers/register-recipient.controller"
import { DatabaseModule } from "./database/database.module"

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    RegisterAccountController,
    RegisterRecipientController,
    AuthenticateController,
  ],
  providers: [
    RegisterCourierUseCase,
    RegisterRecipientUseCase,
    AuthenticateCourierUseCase,
  ],
})
export class HttpModule {}
