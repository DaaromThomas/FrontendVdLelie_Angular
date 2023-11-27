export class Packaging {
    private group: string;
    private id: string;
    public amountInStock: number;
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

    public get getID(): string {
        return this.id
    }

    public get getName(): string {
        return this.name;
    }

    public get getAmount(): number {
        return this.amountInStock;
    }

    public get getMinAmount(): number {
        return this.minAmount;
    }

    public get getLocation(): string {
        return this.location;
    }

    public get getGroup(): string {
        return this.group;
    }

}