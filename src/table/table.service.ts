import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTableDto } from './dto/createtable.dto';
import { UpdateTableDto } from './dto/updatetable.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findById(id: string): Promise<Table> {
    const record = await this.prisma.table.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Não existe mesa com o id: ${id}`);
    }
    return record;
  }

  async findOne(id: string): Promise<Table> {
    return this.findById(id);
  }

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };

    return this.prisma.table.create({ data }).catch(this.errorHandler);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.findById(id);
    const data: Partial<Table> = { ...dto };
    return this.prisma.table
      .update({
        where: { id },
        data,
      })
      .catch(this.errorHandler);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.table.delete({ where: { id } });
  }

  errorHandler(error: Error): undefined {
    const message = error.message?.split('\n');
    const lastmessage = message[message.length - 1]?.trim();
    throw new UnprocessableEntityException(lastmessage || 'Algum erro ocorreu');
  }
}
