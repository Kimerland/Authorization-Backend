import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "jwt-secret",
      signOptions: { expiresIn: "1d" },
    }),
    UsersModule,
    PrismaModule,
  ],
})
export class AuthModule {}
