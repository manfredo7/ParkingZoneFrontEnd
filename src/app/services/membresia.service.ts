import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Membresia } from '../models/membresia';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private url = `${base_url}/membresias`;
  private listaCambio = new Subject<Membresia[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Membresia[]>(this.url);
  }
  insert(m: Membresia) {
    return this.http.post(this.url, m);
  }
  setList(listaNueva: Membresia[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Membresia>(`${this.url}/${id}`)
  }
  update(m: Membresia) {
    return this.http.put(this.url, m);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
