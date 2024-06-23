import { Pago } from "./pago"
import { Reserva } from "./reserva"

export class ReservaPago{
    reservapagoID:number=0
    reserva:Reserva=new Reserva()
    pago:Pago=new Pago()
}