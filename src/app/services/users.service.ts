import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Users } from '../models/users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Userq1Component } from '../components/reportes/userq1/userq1.component';
import { UserQ1DTO } from '../models/Dto/userQ1DTO';
import { UserQ2DTO } from '../models/Dto/userQ2DTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Users[]>();
  
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Users[]>(this.url);
  }
  insert(c: Users) {
    return this.http.post(this.url, c);
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }
  update(c:Users) { 
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getumaxnreservas():Observable<UserQ1DTO[]>{
return this.http.get<UserQ1DTO[]>(`${this.url}/consulta01`)
  }
  getCountUsersPerDateRange(startDate: Date, endDate: Date): Observable<UserQ2DTO> {
    let params = new HttpParams()
      .set('startDate', startDate.toISOString().split('T')[0])
      .set('endDate', endDate.toISOString().split('T')[0]);
      
    return this.http.get<UserQ2DTO>(`${this.url}/consulta02`, { params });
  }
}
