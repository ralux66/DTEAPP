import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from '@angular/common/http';
import { ApiService } from "./app.service";
import { Logs } from "./model/Entities";
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

    ListLogByCompanyguid(inputValue: Logs.Param): Observable<Logs[]> {
        return this.http.post<Logs[]>(
            `${this.ApiURL}/api/logs/listlogbycompanyguid`, inputValue);
    }


}