export class Packaging {
    constructor(
        private readonly amount_: number,
        private readonly id_: string,
        private readonly minAmount_: number,
        private readonly name_: string,
        private readonly group_: string,
        private readonly location_: string
    ) {}

    public get id(): string {
        return this.id_;
    }

    public get name(): string {
        return this.name_;
    }

    public get amount(): number {
        return this.amount_;
    }

    public get minAmount(): number {
        return this.minAmount_;
    }

    public get location(): string {
        return this.location_;
    }

    public get group(): string {
        return this.group_;
    }
}
