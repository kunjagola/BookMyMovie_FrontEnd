import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel } from '../Models/MovieModel';

@Injectable({
  providedIn: 'root'
})
export class MovielistService {
  constructor(private http:HttpClient) { }


  getMovieList(): Observable<any> {
    return this.http.post<{ data: MovieModel[] }>('https://localhost:7074/api/Movies' ,null);
  }

  getSeatData(data:any):Observable<any>{
    return this.http.post<any[]>('https://localhost:7074/api/Seat',data);
  }

  getAuditoriums(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/Movies/Auditoriums',data);
  }

  getTimes(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/Movies/Times',data);
  }
  getMovieByID(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7074/api/Movies/MovieByID',data);
  }
}
