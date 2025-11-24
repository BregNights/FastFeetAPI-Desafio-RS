import { Module } from "@nestjs/common"
import { CreateUserController } from "./controllers/create-user.controller"
import { PrismaService } from "./prisma/prisma.service"

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [PrismaService],
})
export class AppModule {}
