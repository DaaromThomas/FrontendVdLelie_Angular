import { Packaging } from "./packaging";

export interface Customer{
    id: string;
    customernumber: number;
    name: string;
    address: string;
    phonenumber: string;
    email: string;
    preferredPackaging: Packaging;
}