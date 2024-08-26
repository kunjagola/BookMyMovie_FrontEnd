import { Component } from '@angular/core';
import { MovielistService } from '../../../../Services/movielist.service';
import { CommonModule } from '@angular/common';
import { MovieModel } from '../../../../Models/MovieModel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies :MovieModel[] = [];
    
  constructor(public movielistservice:MovielistService){}

  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
    debugger
    this.movielistservice.getMovieList().subscribe(res =>{
      console.log(res.data);
      this.movies = res.data;
    })
  }

  getMovieImage(movieName: string): string {
    return `/${movieName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
  }
  
}