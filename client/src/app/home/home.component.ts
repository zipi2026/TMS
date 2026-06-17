import { Component, inject, OnInit } from '@angular/core';
import { IHomeData } from '../model/IHomeData';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    
  }
  router=inject(Router);
  home: IHomeData={
    title:"אני ציפי מתכנתת פולסטאק",
    phone:'0548523435',
    text:' ',
    img:'img/img.jpg',
    but:"פרטים",
    but2:"תחומי התמחות",
    but3:"לצפיה בפרוייקט"
  }
  goToLogin(){

    // if(localStorage.length)
    //   this.router.navigate(['/main'])
    // else
      this.router.navigate(['/main']);
      //   if(!localStorage.getItem(this.formGroup.value.username)){
      // localStorage.setItem(this.formGroup.value.username, JSON.stringify(this.formGroup.value.password))}
  }

}
