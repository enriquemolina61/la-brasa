import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prisma.product.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Não existe produto com o id: ${id}`);
    }
    return record;
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  create(dto: CreateProductDto): Promise<Product> {
    const data: Product = { ...dto };

    return this.prisma.product.create({ data }).catch(this.errorHandler);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);
    const data: Partial<Product> = { ...dto };
    return this.prisma.product
      .update({
        where: { id },
        data,
      })
      .catch(this.errorHandler);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } });
  }

  errorHandler(error: Error): undefined {
    const message = error.message?.split('\n');
    const lastmessage = message[message.length - 1]?.trim();
    throw new UnprocessableEntityException(lastmessage || 'Algum erro ocorreu');
  }
}
