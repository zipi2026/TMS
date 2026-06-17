import { StatusEnum } from "./status-enum"
export interface Itask {
    taskId:string,
    name:string,
    description:string,
    price:number,
    scheduling:Date,
    status:StatusEnum
}
