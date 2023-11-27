import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3001"
  private token: string = ''
  private user: object = {
    'name': 'VVV'
  }

  constructor(private httpClient: HttpClient){ }

  login(body: any): Observable<any>{
    return this.httpClient.post<any>(this.url + '/auth/login', body)
  }

  auth(): Observable<any>{
    return this.httpClient.post<any>(this.url + '/auth',  {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
  getUser(): Observable<any>{
    return  <any>this.user
  }

  setUser(user: any): Observable<any>{
    this.user = user
    return <any>this.user
  }
}
