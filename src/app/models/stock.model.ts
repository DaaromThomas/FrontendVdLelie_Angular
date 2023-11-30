export class Stock {
    constructor(
        private readonly id: string,
        private readonly stockNumber: number
    ) {}

    public get getId(): string {
        return this.id;
    }
}