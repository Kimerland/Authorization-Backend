import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  providers: [PrismaService],
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UsersModule, PrismaModule],
  exports: [PrismaService],
})
export class AppModule {}
