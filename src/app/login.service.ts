import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './app.service';
import { User } from './model/Entities';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ApiURL: string = '';
  constructor(
      private http: HttpClient,
      private aService: ApiService
  ) {
      this.ApiURL = aService.ApiURL;
  }

  getUserByPassword(params: User.Param): Observable<User> {
    return this.http.post<User>(this.ApiURL, params);
  }
}
