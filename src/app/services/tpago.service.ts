import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Tpago } from '../models/tpago';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TpagoService {

  private url = `${base_url}/tpago`;
  private listaCambio = new Subject<Tpago[]>();
  
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Tpago[]>(this.url);
  }
  insert(c: Tpago) {
    return this.http.post(this.url, c);
  }
  setList(listaNueva: Tpago[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Tpago>(`${this.url}/${id}`);
  }
  update(c:Tpago) { 
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
