import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/createtable.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  tables: Table[] = [];
  findAll() {
    return 'Buscar todas as mesas';
  }
  create(createTableDto: CreateTableDto) {
    const table: Table = { id: 'random-id', ...createTableDto };

    this.tables.push(table);

    return table;
  }
}