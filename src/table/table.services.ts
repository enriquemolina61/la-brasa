import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
  create() {
    return 'Criar uma mesa';
  }
  findAll() {
    return 'Buscar todas as mesas';
  }
}
