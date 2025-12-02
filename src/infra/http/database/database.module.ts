import { CouriersRepository } from "@/domain/carrier/application/repositories/couriers-repository"
import { RecipientsRepository } from "@/domain/carrier/application/repositories/recipients-repository"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { Module } from "@nestjs/common"
import { PrismaCouriersRepository } from "./prisma/repositories/prisma-couriers-repository"
import { PrismaRecipientsRepository } from "./prisma/repositories/prisma-recipients-repository"

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: CouriersRepository,
      useClass: PrismaCouriersRepository,
    },
    {
      provide: RecipientsRepository,
      useClass: PrismaRecipientsRepository,
    },
  ],
  exports: [PrismaService, CouriersRepository, RecipientsRepository],
})
export class DatabaseModule {}
