import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/createtable.dto';
import { TableService } from './table.services';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  @Get()
  findAll() {
    return this.tableService.findAll();
  }
  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }
}
