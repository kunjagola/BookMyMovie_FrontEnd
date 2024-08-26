import { Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { HeaderComponent } from './Component/header/header.component';
import { MovieListComponent } from './Pages/Movies/Movie-list/movie-list/movie-list.component';
import { MovieDetailComponent } from './Pages/Movies/Movie-detail/movie-detail/movie-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'' , component: MovieListComponent },
    {path: 'movie-detail/:id', component:MovieDetailComponent, canActivate: [authGuard]},
    {path: 'movie-list', component:MovieListComponent},
    {path: 'log-in', component:LoginComponent},
];
