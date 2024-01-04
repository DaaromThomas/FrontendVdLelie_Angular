import { Time } from "@angular/common";
import { Account } from "../interfaces/account.interface";
import { Packaging } from "./packaging.model";
import { Product } from "./product";

export class Log{
    constructor(
        private account: Account,
        private product: Product,
        private packaging: Packaging,
        private packagingAmount: number,
        private date: Date,
        private time: Time
    ){}

    get account_(): Account{
        return this.account;
    }

    set account_(account: Account){
        this.account = account;
    }

    get product_(): Product{
        return this.product;
    }

    set product_(product: Product){
        this.product = product;
    }

    get packaging_(): Packaging{
        return this.packaging;
    }

    set packaging_(packaging: Packaging){
        this.packaging = packaging;
    }

    get packagingAmount_(): number{
        return this.packagingAmount;
    }

    set packagingAmount_(amount: number){
        this.packagingAmount = amount;
    }

    get date_(): Date{
        return this.date;
    }

    set date_(date: Date){
        this.date = date;
    }

    get time_(): Time{
        return this.time;
    }

    set time_(time: Time){
        this.time = time;
    }
}