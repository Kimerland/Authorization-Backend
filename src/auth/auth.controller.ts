import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/users/dto/create-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getMe(@Request() req) {
    const user = req.user;
    return {
      id: user.id,
      email: user.email,
    };
  }

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @Post("login")
  async login(@Res({ passthrough: true }) res, @Body() dto: LoginUserDto) {
    const { token } = await this.authService.login(dto);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    return { message: "Logged success!" };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res) {
    res.clearCookie("token");
    return { message: "Logged out" };
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req, @Res() res) {
    const token = this.authService.createToken(req.user);
    res.cookie("token", token, { hhtpOnly: true });
    res.redirect("http://localhost:3000/profile");
  }
}
