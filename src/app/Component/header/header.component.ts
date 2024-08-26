import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../User/login/login.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule,MatSidenavModule,MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userID: number | null = null;
  isLoggedIn : boolean = false;
  public profileOptions = [
    'Profile',
    'Settings',
    'Log Out'
  ];
  selectedProfile = 'Profile';
  constructor(private router :Router, private matDialog :MatDialog){

  }
  ngOnInit(): void {
    const userIDString = localStorage.getItem('userID');
    this.userID = userIDString !== null ? Number(userIDString) : null;

    if(this.userID !== null){
      this.isLoggedIn = true;
    }
  }

  onSignIn(): void {
    this.openLoginDialog();
  }
  

  onProfileOptionSelect(option: string): void {
    switch (option) {
      case 'Profile':
        break;
      case 'Settings':
        break;
      case 'Log Out':
        localStorage.clear();
        this.isLoggedIn = false;
        this.userID = null;
        window.location.reload()
        
        break;
    }
  }

  openLoginDialog(): void {
    this.matDialog.open(LoginComponent, {
      data: { isSignUp: false },
      width: '600px'
    });
  }

}
