import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {

  constructor(private http:HttpClient) { }

  GetUserDetail(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/User',data);
  }
  InsertUserDetail(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/User/InsertUserDetail',data);
  }
}
