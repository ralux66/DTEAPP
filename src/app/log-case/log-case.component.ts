import { Component, OnInit } from '@angular/core';
import { DteService } from '../log.service';
import { Logs } from '../model/Entities';
//import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-case',
  templateUrl: './log-case.component.html',
  styleUrls: ['./log-case.component.css']
})
export class LogCaseComponent implements OnInit {
  dataSource: Logs[];
  displayedColumns: string[] = [

    //'Nivel',
    'Datos',
    'Origen',
    'Mensaje',
    "Fecha",
  ];

  constructor(private dteService: DteService) {
    this.dataSource = [];
  };
  ngOnInit(): void {
    const customerguid = sessionStorage.getItem('customerguid')?.toString();
    this.dteService.ListLogByCompanyguid(
      { companyguid: customerguid }).subscribe((result: Logs[]) => {
        this.dataSource = result; //ELEMENT_DATA_BILL;
      });
  }
}
