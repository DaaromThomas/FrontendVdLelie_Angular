import {Packaging} from "./packaging.model";


export class Customer{
    public address: string;
    public customerNumber: number;
    public email: string;
    public id: string;
    public name: string;
    public phoneNumber: number;
    public preferredPackaging!: Packaging;

    constructor(
         address: string,
        customerNumber: number,
        email: string,
        id: string,
        name: string,
        phoneNumber: number,
        prefferedPackaging: Packaging
    ){
        this.address = address;
        this.customerNumber = customerNumber;
        this.email = email;
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.preferredPackaging = prefferedPackaging;
    }

}
