import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/createtable.dto';

@Injectable()
export class TableService {
  create(createTableDto: CreateTableDto) {
    return 'Criar uma mesa' + JSON.stringify(createTableDto);
  }
  findAll() {
    return 'Buscar todas as mesas';
  }
}
