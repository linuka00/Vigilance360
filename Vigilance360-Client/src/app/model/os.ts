import { Platform } from "@angular/cdk/platform";

export interface Os extends Platform{
    name:string,
    edition:string,
    system_type:string,
    version:string,
    u_id:string,
    d_id:string
}
