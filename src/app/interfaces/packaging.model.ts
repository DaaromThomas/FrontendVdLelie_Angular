export class Packaging {
    private group: string;
    private id: string;
    private amountInStock: number;
    private minAmount: number;
    private name: string;
    private location: string;

    public constructor(group: string, id: string, amountInStock: number, minAmount: number, name: string, location: string) {
        this.group = group;
        this.id = id;
        this.amountInStock = amountInStock;
        this.minAmount = minAmount;
        this.name = name;
        this.location = location
    }

    public getID(): string {
        return this.id
    }

    public getName(): string {
        return this.name;
    }

    public getAmount(): number {
        return this.amountInStock;
    }

    public getMinAmount(): number {
        return this.minAmount;
    }

    public getLocation(): string {
        return this.location;
    }

    public getGroup(): string {
        return this.group;
    }

}