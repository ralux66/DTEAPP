import { Component, OnInit } from '@angular/core';
import { DteService } from '../log.service';
import { Logs } from '../model/Entities';
//import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-case',
  templateUrl: './log-case.component.html',
  styleUrls: ['./log-case.component.css']
})
export class LogCaseComponent  implements OnInit  {
  dataSource: Logs[];
  displayedColumns: string[] = [
    
    //'Nivel',
    'Datos',
    'Origen',
    'Mensaje',   
    "Fecha",
  ];

  constructor(private dteService: DteService) {
    this.dataSource= [];
  };
  ngOnInit(): void {
    this.dteService.ListLogByCompanyguid(
      { companyguid: '123e4567-e89b-12d3-a456-426655440000' }).subscribe((result: Logs[]) => {
        this.dataSource = result; //ELEMENT_DATA_BILL;
      });
  }

  /* exportAsExcel()
    {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // save to file */
      //XLSX.writeFile(wb, 'SheetJS.xlsx');

    //}
    

}
