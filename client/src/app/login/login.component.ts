import { Component, inject} from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,FormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  router=inject(Router)
  mouseOverLogin:boolean=false
  formGroup:FormGroup={} as FormGroup
  errorMassage="שדה זה הינו חובה*"
  constructor(private formBuilder:FormBuilder){}

  ngOnInit(){
    this.formGroup=this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
        console.log(this.formGroup.value)

    const{username,password}=this.formGroup.value
    // console.log(username);
    // console.log(password);
      // localStorage.setItem(this.formGroup.value.username, JSON.stringify(this.formGroup.value.password))
      localStorage.setItem('user', JSON.stringify({username,password }));
      this.router.navigate(['/main'])
  }
    
}
