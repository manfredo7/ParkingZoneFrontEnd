import { Testacionamiento } from "./testacionamiento";

export class Estacionamiento {
    idEstacionamiento: number = 0;
    nombreEstacionamiento: string="";
    direccionEstacionamiento: string="";
    capacidadEstacionamiento: number = 0;
    tarifaEstacionamiento:number=0;
    horarioperativoEstacionamiento: string="";
    ventajasEstacionamiento: string="";
    desventajasEstacionamiento: string="";
    testacionamiento: Testacionamiento=new Testacionamiento();
  }