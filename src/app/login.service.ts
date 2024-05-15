import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { ApiService } from "./app.service";
import { BillDTE, DTE } from "./model/Entities";
import { Observable } from 'rxjs';


@Injectable(
    {
        providedIn: 'root'
    }
)

export class DteService {
    ApiURL: string = '';
    constructor(
        private http: HttpClient,
        private aService: ApiService
    ) {
        this.ApiURL = aService.ApiURL;
    }

    GetAllBillByCompany(inputValue: DTE.Param): Observable<BillDTE[]> {  
        return this.http.post<BillDTE[]>(
            `${this.ApiURL}/api/bill/findBillByCompany`, inputValue);
    }

    SetUploadFile(inputFile: FormData) {
        return this.http.post<HttpEvent<any>>(
            `${this.ApiURL}/api/bill/uploadFile`, inputFile);
    }

    GetAllBillPending(inputValue: DTE.Param): Observable<BillDTE[]> {
        return this.http.post<BillDTE[]>(
            `${this.ApiURL}/api/bill/findAllPendingBillByCompany`, inputValue);
    }
}