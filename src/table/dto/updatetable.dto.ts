import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './createtable.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {}
