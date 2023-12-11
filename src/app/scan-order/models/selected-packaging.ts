import { Packaging } from "../../interfaces/packaging";

export class SelectedPackaging {

    selectedPackaging: Packaging;
    amount: number;
    constructor(selectedPackaging: Packaging, amount: number) {
        this.selectedPackaging = selectedPackaging;
        this.amount = amount;
    }
}