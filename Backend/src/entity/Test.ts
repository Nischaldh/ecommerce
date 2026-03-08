import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("test")
export class Test{
    @PrimaryColumn({type: "int"})
    id!:number

    @Column({type:"text"})
    name!:string
}