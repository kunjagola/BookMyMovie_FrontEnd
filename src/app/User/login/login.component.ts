import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { UserdetailService } from '../../Services/userdetail.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  isSignInForm: boolean = true; // Initialize as true
  isRegistrationForm: boolean = false; // Initialize as false

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isSignUp: boolean },
    private userdetailservice : UserdetailService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
      dob: [''],
      city: [''],
      age: ['']
    },{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('confirmPassword')?.value === form.get('password')?.value
      ? null : { mismatch: true };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    debugger
      if(this.isSignInForm){
        this.SignIn();
      }
      if(this.isRegistrationForm){
        this.Registration();
      }
  }

  registerHereFromOpen(): void {
    this.isSignInForm = false;
    this.isRegistrationForm = true;
  }

  signInHereFromOpen(): void {
    this.isSignInForm = true;
    this.isRegistrationForm = false;
  }

  SignIn(){
    const reqparam = {
      Uname : this.form.get('email')?.value,
      Upassword : this.form.get('password')?.value
    }
    this.userdetailservice.GetUserDetail(reqparam).subscribe(response =>{
      if(response.success){
        alert("Successfully Login");
        localStorage.setItem('userID',response.data[0].UserDetailsID);
        window.location.reload();
      }
    })

  }
  Registration(){
    const reqparam = {
      Cemail : this.form.get('email')?.value,
      Cpassword : this.form.get('password')?.value,
      CustomerDOB: this.form.get('dob')?.value,
      CageCage : this.form.get('age')?.value,
      ClientLocationID:1
    }
    this.userdetailservice.InsertUserDetail(reqparam).subscribe(res=>{
      if(res.success){
        alert("User registerd Successful");
        localStorage.setItem('userID',res.data.userID);
        window.location.reload();
      }
    })
  }
}
