import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { errorHandler } from 'src/utils/handleErrors.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: createOrderDto.userId,
        },
      },
      table: {
        connect: {
          number: createOrderDto.tableNumber,
        },
      },
    };
    return this.prisma.order.create({ data }).catch(errorHandler);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
