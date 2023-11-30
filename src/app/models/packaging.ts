import { Stock } from "./stock";

export interface Packaging {
  amountinstock: number;
  id?: string;
  minAmount: number;
  name: string;
  packagingGroup: string;
  location?: string;
  stock?: Stock
}
