import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  providers: [PrismaService],
  imports: [AuthModule, UsersModule, PrismaModule],
  exports: [PrismaService],
})
export class AppModule {}
