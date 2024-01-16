import { Time } from "@angular/common";
import { Account } from "../interfaces/account.interface";
import { Product } from "./product";
import { Packaging } from "../interfaces/packaging";

export class Log {
    private _id: string;
    private _account: Account;
    private _product: Product;
    private _packaging: Packaging;
    private _packagingamount: number;
    private _date: Date;
    private _time: Time;
    private _reverted: boolean;

    constructor(
        account: Account,
        product: Product,
        packaging: Packaging,
        packagingamount: number,
        date: Date,
        time: Time,
        reverted: boolean
    ) {
        this._id = '';
        this._account = account;
        this._product = product;
        this._packaging = packaging;
        this._packagingamount = packagingamount;
        this._date = date;
        this._time = time;
        this._reverted = reverted;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get account(): Account {
        return this._account;
    }

    set account(account: Account) {
        this._account = account;
    }

    get product(): Product {
        return this._product;
    }

    set product(product: Product) {
        this._product = product;
    }

    get packaging(): Packaging {
        return this._packaging;
    }

    set packaging(packaging: Packaging) {
        this._packaging = packaging;
    }

    get packagingamount(): number {
        return this._packagingamount;
    }

    set packagingamount(amount: number) {
        this._packagingamount = amount;
    }

    get date(): Date {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
    }

    get time(): Time {
        return this._time;
    }

    set time(time: Time) {
        this._time = time;
    }

    get reverted(): boolean {
        return this._reverted;
    }

    set reverted(reverted: boolean) {
        this._reverted = reverted;
    }
}
