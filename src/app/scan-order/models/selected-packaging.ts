import { Packaging } from "../../interfaces/packaging";

export class SelectedPackaging {

    subscription: any;
    packageList: Packaging[] = [];

    public selectedPackaging: Packaging;
    public amount: number;
    constructor(selectedPackaging: Packaging, amount: number) {
        this.selectedPackaging = selectedPackaging;
        this.amount = amount;
    }
}