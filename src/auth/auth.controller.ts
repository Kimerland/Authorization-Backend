import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/users/dto/create-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @Post("login")
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
}
