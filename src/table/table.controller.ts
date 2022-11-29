import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/createtable.dto';
import { UpdateTableDto } from './dto/updatetable.dto';
import { Table } from './entities/table.entity';
import { TableService } from './table.services';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  @Get()
  @ApiOperation({ summary: 'Listar Todas as Mesas' })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Listar uma Mesa' })
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma Mesa' })
  create(@Body() dto: CreateTableDto): Promise<Table> {
    return this.tableService.create(dto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Alterando uma mesa' })
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tableService.update(id, dto);
  }
}
