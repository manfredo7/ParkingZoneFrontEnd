import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { ReservaPago } from '../models/reservaPago';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ReservapagoService {
  private url = `${base_url}/reservapagos`;
  private listaCambio = new Subject<ReservaPago[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ReservaPago[]>(this.url);
  }
  insert(r: ReservaPago) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: ReservaPago[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<ReservaPago>(`${this.url}/${id}`);
  }
  update(r:ReservaPago) { 
    return this.http.put(this.url, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
