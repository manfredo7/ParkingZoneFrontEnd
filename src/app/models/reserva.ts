import { Time } from "@angular/common";
import { Estacionamiento } from "./estacionamiento";
import { Users } from "./users";


export class Reserva{
    idReserva:number =0;
    fechaReserva: Date = new Date(Date.now());
    horaInicioReserva: Time = {hours: 0, minutes: 0};
    horaFinalReserva: Time = {hours: 0, minutes: 0};
    estadoReserva: string="";
    estacionamiento: Estacionamiento = new Estacionamiento();
    usuario: Users = new Users();
}