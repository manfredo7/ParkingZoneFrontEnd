import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Role } from '../models/role';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Role[]>();
  
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Role[]>(this.url);
  }
  insert(c: Role) {
    return this.http.post(this.url, c);
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
  update(c:Role) { 
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
