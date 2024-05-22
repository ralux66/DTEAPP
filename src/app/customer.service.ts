import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { ApiService } from "./app.service";
import { Customer } from "./model/Entities";
import { Observable } from 'rxjs';


@Injectable(
    {
        providedIn: 'root'
    }
)

export class CustomerService {
    ApiURL: string = '';
    constructor(
        private http: HttpClient,
        private aService: ApiService
    ) {
        this.ApiURL = aService.ApiURL;
    }
 

    GetCustomerByCompanyguid(inputValue: Customer.Param): Observable<Customer> {
        return this.http.post<Customer>(
            `${this.ApiURL}/api/customer/findbycompnayguid`, inputValue);
    }
}