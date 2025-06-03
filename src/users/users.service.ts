import { Injectable } from "@nestjs/common";
import { UpdateUser } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, updateDto: UpdateUser) {
    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateDto,
    });
  }
}