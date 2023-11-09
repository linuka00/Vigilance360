import { Platform } from "@angular/cdk/platform"

export interface Hardware extends Platform{
    name:string,
    brand:string,
    model:string,
    category:string
    u_id:string,
    d_id:string
}
