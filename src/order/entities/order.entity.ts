import { Table } from 'src/table/entities/table.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

export class Order {
  id?: string;
  user?: User;
  table?: Table;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
