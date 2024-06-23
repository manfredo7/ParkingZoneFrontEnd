import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Pago } from '../models/pago';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PagoQ1DTO } from '../models/Dto/pagoq1DTO';
import { PagoQ2DTO } from '../models/Dto/pagoq2DTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/pago`;
  private listaCambio = new Subject<Pago[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pago[]>(this.url);
  }
  insert(b: Pago) {
    return this.http.post(this.url, b);
  }
  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Pago>(`${this.url}/${id}`);
  }
  update(c:Pago) { 
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getpagomasutilizado():Observable<PagoQ1DTO[]>{
    return this.http.get<PagoQ1DTO[]>(`${this.url}/Tipopagocantidad`);
  }


  getTotalReservasRangoTiempo(fechahora1: Date, fechahora2: Date):Observable<PagoQ2DTO>{
    const startDateISOStr = fechahora1.toISOString().slice(0, -5)
    const endDateISOStr = fechahora2.toISOString().slice(0, -5)
    return this.http.get<PagoQ2DTO>(`${this.url}/TotalReservasRangoTiempo?startDate=${startDateISOStr}&endDate=${endDateISOStr}`);
  }
}
