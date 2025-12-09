import { CouriersRepository } from "@/domain/carrier/application/repositories/couriers-repository"
import { PackagesRepository } from "@/domain/carrier/application/repositories/packages-repository"
import { RecipientsRepository } from "@/domain/carrier/application/repositories/recipients-repository"
import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { Module } from "@nestjs/common"
import { PrismaCouriersRepository } from "./prisma/repositories/prisma-couriers-repository"
import { PrismaNotificationsRepository } from "./prisma/repositories/prisma-notifications-repository"
import { PrismaPackagesRepository } from "./prisma/repositories/prisma-packages-repository"
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
    {
      provide: PackagesRepository,
      useClass: PrismaPackagesRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    CouriersRepository,
    RecipientsRepository,
    PackagesRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
