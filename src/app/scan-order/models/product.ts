import {Order} from "./order";

export class Product {
  public prefferedPackage: string;
  public order: Order;
  public name: string;
  public productNumber: number;
  public productType: string;

  constructor(
    prefferedPackage: string,
    order: Order,
    name: string,
    productNumber: number,
    productType: string
  ){
    this.prefferedPackage = prefferedPackage;
    this.order = order;
    this.name = name;
    this.productNumber = productNumber;
    this.productType = productType;
  }
}
