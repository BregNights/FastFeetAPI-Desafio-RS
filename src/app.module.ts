import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { CreateUserController } from "./controllers/create-user.controller"
import { envSchema } from "./env/env"
import { EnvModule } from "./env/env.module"
import { PrismaService } from "./prisma/prisma.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
  ],
  controllers: [CreateUserController],
  providers: [PrismaService],
})
export class AppModule {}
