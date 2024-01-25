import { Location } from "./location";

export interface AccountCreate {
  location: Location;
  employeenumber: Number;
  name: string;
  password: string;
  email: string;
  noitification: boolean;
}
