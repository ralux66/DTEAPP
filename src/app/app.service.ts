import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ApiService {
    ApiURL = 'http://localhost:3000';
   // ApiURL = 'https://dte-backend-e894411e55f9.herokuapp.com'; //PROD
    constructor(private http: HttpClient) { }
}