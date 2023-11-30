import { Stock } from "./stock.model";

export class Locations {
    constructor(
        private readonly id: string,
        private readonly address: string,
        private stock: Stock

    ) {}

    public get getAddress(): string {
        return this.address;
    }

    public get getStock(): Stock {
        return this.stock;
    }
}