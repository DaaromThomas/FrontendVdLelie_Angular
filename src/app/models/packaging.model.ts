export class Packaging {
    constructor(
        private readonly amount: number,
        private readonly id: string,
        private readonly minAmount: number,
        private readonly name: string,
        private readonly group: string,
        private readonly location: string
    ) {}

    public get getId(): string {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getAmount(): number {
        return this.amount;
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
