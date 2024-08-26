import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserreservationService {

  constructor(private http:HttpClient) { }

  InsertUserBookingDetail(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/Seat/InsertUserDetail',data);
  }
}
