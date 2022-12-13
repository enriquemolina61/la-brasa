import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    image: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select: this.userSelect });
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
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
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    try {
      return await this.prisma.user.create({
        data,
        select: this.userSelect,
      });
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    if (dto.password) {
      if (dto.password !== dto.confirmPassword) {
        throw new UnprocessableEntityException(
          'A confirmação de senha não confere',
        );
      }
    }

    delete dto.confirmPassword;
    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: this.userSelect,
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
