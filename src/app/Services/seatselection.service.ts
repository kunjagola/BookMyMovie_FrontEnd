import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeatLayoutResponse } from '../Models/SeatLayoutResponse';

@Injectable({
  providedIn: 'root'
})
export class SeatselectionService {

  constructor(private http:HttpClient) { }

  getSeatLayout(data:any):Observable<SeatLayoutResponse>{
    return this.http.post<SeatLayoutResponse>('https://localhost:7074/api/Seat',data);
  }

  getFareForEachSeat(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/Seat/CalculateFinalFare',data);
  }

  InsertTicketBooking(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/Seat/ConfirmBooking',data);
  }
}
