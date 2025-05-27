import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  // constructor(private userService: UsersService) {}
  constructor(private prisma: PrismaService) {}

  async login(userDto: CreateUserDto) {}

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
}