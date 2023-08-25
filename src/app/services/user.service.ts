import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3000"
  private token: string = ''
  private user: object = {
    'name': 'VVV'
  }

  constructor(private httpClient: HttpClient){ }

  login(body: any): Observable<any>{
    return this.httpClient.post<any>(this.url + '/auth/login', body)
  }
  
  getUser(): Observable<any>{
    return  <any>this.user
  }
  
  setUser(user: any): Observable<any>{
    this.user = user
    return <any>this.user
  }
}
