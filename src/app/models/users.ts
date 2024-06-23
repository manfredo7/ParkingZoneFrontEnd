import { Membresia } from "./membresia"

export class Users{
    id:number=0;
    username: string="";
    password: string="";
    enabled: boolean=false;
    fregistro: Date=new Date();
    nombre: string=""
    apellidoP: string=""
    apellidoM: string=""
    fnacimiento: Date=new Date();
    correo: string="";
    membresia: Membresia= new Membresia();
}