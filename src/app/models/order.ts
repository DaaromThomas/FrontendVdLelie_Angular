export class Order{
  public id: number;
  public customer: string;
  public name: string;
  public orderNumber: number;

  constructor(
    id: number,
    customer: string,
    name: string,
    orderNumber: number
  ){
    this.id = id;
    this.customer = customer;
    this.name = name;
    this.orderNumber = orderNumber;
  }
}
