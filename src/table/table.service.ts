import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { errorHandler } from 'src/utils/handleErrors.util';
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

    return this.prisma.table.create({ data }).catch(errorHandler);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.findById(id);
    const data: Partial<Table> = { ...dto };
    return this.prisma.table
      .update({
        where: { id },
        data,
      })
      .catch(errorHandler);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.table.delete({ where: { id } });
  }
}
