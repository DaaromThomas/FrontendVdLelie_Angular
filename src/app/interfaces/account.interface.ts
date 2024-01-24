import { Location } from "../interfaces/location";

export interface Account {
  id: string;
  location: Location;
  employeenumber: Number;
  name: string;
  role: string;
  email: string;
  notification: boolean;
}
