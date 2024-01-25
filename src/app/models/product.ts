import {Order} from "./order";
import {Packaging} from "./packaging.model";

export class Product {
  public id: string;
  public prefferedpackage: Packaging;
  public order: Order;
  public name: string;
  public productnumber: number;
  public productType: string;
  public packed: boolean;

  constructor(
    id: string,
    preferredPackage: Packaging,
    order: Order,
    name: string,
    productNumber: number,
    productType: string,
    packed: boolean
  ){
    this.id = id;
    this.prefferedpackage = preferredPackage;
    this.order = order;
    this.name = name;
    this.productnumber = productNumber;
    this.productType = productType;
    this.packed = packed;
  }
}
