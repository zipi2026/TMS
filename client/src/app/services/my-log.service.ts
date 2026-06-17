import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyLogService {

  constructor(private router:Router) { }
      canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          
          
          const isLoggedIn = this.checkUserInLocalStorage();
          if (!isLoggedIn) {
              this.router.navigate(['/login']);
              return false;
          } else {
              
           }
          return isLoggedIn;
  
      }
      checkUserInLocalStorage():boolean{
        
    // if(localStorage.length){
    //   this.router.navigate(['/main'])
    //   return true;
    // }
    // return false;
    //   }
            return localStorage.length>0;

}
}