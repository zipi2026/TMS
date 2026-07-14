import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceBase } from './http-service.base';
import { HttpRequestModel } from '../../model/http-request.model';
import { IUser } from '../../model/user';

@Injectable({  providedIn: 'root'})
export class AuthService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.servicePath}auth/`;
  }

  login$({userName, password}:{userName:string, password:string}): Observable<IUser> {
   return this.post$<IUser>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'check-login',
      body: { userName, password }
    }));
  }

  logout$(): Observable<{success: boolean}> {
    return this.post$<{success: boolean}>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'logout'
    }));
  }

  getSession$(): Observable<IUser> {
    return this.get$<IUser>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'session'
    }));
  }

}

