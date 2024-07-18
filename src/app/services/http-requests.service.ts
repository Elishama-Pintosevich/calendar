import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  addDate(name: string, description: string, url: string){
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
     
      const body: any = {}
      this.http.post("http://localhost:5079/WeatherForecast", body, {headers}).subscribe((res)=> {console.log(res)}
      )

  }
  getDates(bpn?: string){
    
    return this.http.get<{[key: string]: any}>(`https://diburim-tovim-c744ba98a7d6.herokuapp.com/bpnByPhoneNumber/${bpn}`)
    .pipe(map(response => {
    
      return response
    }))
    
  }
  postDate(body: any){
    return this.http.post<{[key: string]: any}>(`https://diburim-tovim-c744ba98a7d6.herokuapp.com/calendar`, body)
    .pipe(map(response => {
    
      return response
    }))

  }
  deleteDate(id:number){
    return this.http.delete<{[key: string]: any}>(`https://diburim-tovim-c744ba98a7d6.herokuapp.com/calendar/${id}`)
    .pipe(map(response => {
    
      return response
    }))
  }
  checkUser(phone: any){
    return this.http.get<{[key: string]: any}>(`https://diburim-tovim-c744ba98a7d6.herokuapp.com/userByPhoneNumber/${phone}`)
    .pipe(map(response => {
    
      return response
    }),
    catchError(error => {
      
      return throwError(() => new Error('User not found or other error occurred')); // Use error factory function
    }))

  }

}
