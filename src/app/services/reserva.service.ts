import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = `${base_url}/reservas`;
  private listaCambio = new Subject<Reserva[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Reserva[]>(this.url);
  }
  insert(r: Reserva) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Reserva[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Reserva>(`${this.url}/${id}`);
  }
  update(r:Reserva) { 
    return this.http.put(this.url, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
