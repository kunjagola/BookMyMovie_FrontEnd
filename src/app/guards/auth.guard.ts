
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../User/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  matDialog: any;

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('userID')) {
      alert("Please Sign In First");
      this.router.navigate(['/movie-list']);
      return false;
    }
    return true;
  }
}
