import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { TasksComponent } from '../tasks/tasks.component';
import { CheckHttpService } from '../services/http/check-http.service';
import { tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main',
  imports: [CommonModule,NavbarComponent,TasksComponent,HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
   isServerAlive=false
   connection=inject(CheckHttpService)
   buttons:any=[
    {
       value:"Table",
       name:"טבלה"
    },
    {
      value:"Table",
       name:"להוספת משימה"
    },
    {
      value:"Table",
       name:"אודות"
    },
     {
      value:"Table",
       name:"דף הבית"
    }
   ]
   ngOnInit(): void {
    setInterval(() => {
      this.connection.check$().pipe(
        tap((result) => this.isServerAlive = !!result)
        ).subscribe(
          (_=>{}),
          (err => {})
        );
    }, 500);
   }
}
