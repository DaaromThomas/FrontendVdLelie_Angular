import { Packaging } from "./packaging";

export interface Customer{
    id?: string;
    number: number;
    name: string;
    address: string;
    phonenumber: string | null;
    email: string | null;
    preferredPackaging?: Packaging;
}