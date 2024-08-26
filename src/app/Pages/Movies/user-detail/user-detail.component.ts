import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserreservationService } from '../../../Services/userreservation.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDetailComponent>,
    private userreservationservice : UserreservationService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit(): void {
    const reservationDetailIdsString = localStorage.getItem('reservationdetailid');

    const param: any = {
        userID: localStorage.getItem('userID'),
        reservationID: reservationDetailIdsString ? JSON.parse(reservationDetailIdsString) : []
    };
    this.userreservationservice.InsertUserBookingDetail(param).subscribe(response => {
      if(response.success){
        alert("Ho Gaya re");
        this.dialogRef.close();
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
