import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hashPassword; // hashPassword プロパティを削除する

    return user;
  }
}
