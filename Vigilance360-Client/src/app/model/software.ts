import { Platform } from "@angular/cdk/platform"

export interface Software extends Platform{
    name:string,
    publisher:string,
    version:string
    u_id:string,
    d_id:string
}
