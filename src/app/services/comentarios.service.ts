import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Comentarios } from '../models/comentarios';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentarios[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comentarios[]>(this.url);
  }
  insert(e: Comentarios) {
    return this.http.post(this.url, e);
  }
  setList(listaNueva: Comentarios[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Comentarios>(`${this.url}/${id}`)
  }
  update(e: Comentarios) {
    return this.http.put(this.url, e);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
