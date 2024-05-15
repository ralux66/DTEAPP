import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { ApiService } from "./app.service";
import { BillDTE, DTE, SubmiteDTE } from "./model/Entities";
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

    /*
    req.body.companynit = '94501110101012';
    req.body.user = '94501110101012';
    req.body.password = 'SpiritAirline@2023';
    req.body.passwordPri = 'impuestos2016';
    */

    SubmitDTE(inputValue: SubmiteDTE.Param): Observable<BillDTE[]> {
        return this.http.post<BillDTE[]>(
            `${this.ApiURL}/api/bill/submitbill`, inputValue);
    }
    
    SubmiteAllDTE(inputValue: SubmiteDTE.Param):Observable<BillDTE[]>{
        return this.http.post<BillDTE[]>(`${this.ApiURL}/api/bill/submitAllbill`,inputValue);
    }
}