import { Packaging } from "../../interfaces/packaging";

export class SelectedPackaging {

    public selectedPackaging: Packaging;
    public amount: number;
    constructor(selectedPackaging: Packaging, amount: number) {
        this.selectedPackaging = selectedPackaging;
        this.amount = amount;
    }
}