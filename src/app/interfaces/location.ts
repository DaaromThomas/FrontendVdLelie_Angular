import { Stock } from './stock';

export interface Location {
  id: string;
  address: string;
  stock: Stock;
}
