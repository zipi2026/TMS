import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { HoverHighlightDirective } from './directive/appoverhilight.directive';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports:[
    MainComponent,
    CommonModule,
    HomeComponent,
    DashboardComponent,
    // HoverHighlightDirective,
    LoginComponent,
    RouterModule
  ]
})
export class AppComponent {
  title = 'emptyProject';
}
