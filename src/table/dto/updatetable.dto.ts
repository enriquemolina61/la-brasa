import { PartialType } from '@nestjs/swagger';
import { CreateTableDto } from './createtable.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {}
