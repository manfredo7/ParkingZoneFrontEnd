import { Tpago } from "./tpago"
import { Time } from "@angular/common";


export class Pago{

    idPago: number = 0;
    documentoPago: string = '';
    montoPago: number = 0;
    fechahoraPago: string = '';
    tpago: Tpago = new Tpago();
}