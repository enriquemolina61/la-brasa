import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Não existe produto com o id: ${id}`);
    }
    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password !== dto.confirmPassword) {
      throw new UnprocessableEntityException(
        'A confirmação de senha não confere',
      );
    }
    delete dto.confirmPassword;
    const data: User = { ...dto };

    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    delete dto.confirmPassword;
    const data: Partial<User> = { ...dto };
    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch(this.errorHandler);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }

  errorHandler(error: Error): undefined {
    const message = error.message?.split('\n');
    const lastmessage = message[message.length - 1]?.trim();
    throw new UnprocessableEntityException(lastmessage || 'Algum erro ocorreu');
  }
}
