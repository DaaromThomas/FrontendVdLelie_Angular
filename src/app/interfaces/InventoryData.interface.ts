import { Packaging } from "./packaging";
import { Location } from "./location";
import { Stock } from "./stock";

export interface InventoryData {
    packageList: Packaging[];
    locationList: Location[];
    locationNames: string[];
   }
   