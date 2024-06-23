import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Testacionamiento } from '../models/testacionamiento';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TestacionamientoService {
  private url = `${base_url}/testacionamientos`;
  private listaCambio = new Subject<Testacionamiento[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Testacionamiento[]>(this.url);
  }
  insert(te: Testacionamiento) {
    return this.http.post(this.url, te);
  }
  setList(listaNueva: Testacionamiento[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Testacionamiento>(`${this.url}/${id}`)
  }
  update(te: Testacionamiento) {
    return this.http.put(this.url, te);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
