import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto, LoginUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const findUser = await this.prisma.user.findUnique({ where: { email } });
    if (!findUser) throw new BadRequestException("User not found");

    const isPassword = await bcrypt.compare(password, findUser.password);
    if (!isPassword) throw new BadRequestException("Invalid password");

    const payload = { email: findUser.email, sub: findUser.id };
    const token = this.jwtService.sign(payload);

    return { message: "User is login", token };
  }

  async registration(userDto: CreateUserDto) {
    const { email, password, confirmPassword } = userDto;

    if (userDto.password !== userDto.confirmPassword) {
      throw new BadRequestException("Password is none");
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { message: "User registered success", userId: user.id };
  }

  async createToken(user: { id: number; email: string }) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
