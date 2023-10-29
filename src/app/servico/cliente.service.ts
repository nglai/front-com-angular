import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }

  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url, obj);
  }

  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
