import { Customer } from "./Customer";

export class Order{
  public id: number;
  public customer: Customer;
  public name: string;
  public orderNumber: number;

  constructor(
    id: number,
    customer: Customer,
    name: string,
    orderNumber: number
  ){
    this.id = id;
    this.customer = customer;
    this.name = name;
    this.orderNumber = orderNumber;
  }
}
