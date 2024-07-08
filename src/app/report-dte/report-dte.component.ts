import { Component, OnInit, ViewChild } from '@angular/core';
import { DteService } from '../dte.service';
import { BillDTE, DTE } from '../model/Entities';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import * as XLSX from 'xlsx';


export interface ReportOpt {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-report-dte',
  templateUrl: './report-dte.component.html',
  styleUrls: ['./report-dte.component.css']
})
export class ReportDteComponent implements OnInit {
  dataSource!: any; //BillDTE[]; 
  showSpinner: boolean = false;
  startDate!: Date;
  endDate!: Date;
  fileName:string;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "RecLoc",
    'NumeroControl',
    'CodigoGeneracion',
    'FirstName',
    'LastName',
    'BookingDate',
    /* 'ArcIata',
      */
    /*  'BookingDate',
     'FlightDate', */
    //'SegmentOrigin',
    //'SegmentDest',
    'Base',
    'SV',
    'SubmitDte',
    'BatchTransaction',
    // 'Estatus',
    // 'Action'
  ];

  constructor(private dteService: DteService) {
    let fechaGeneracion : number = Date.now();
    this.fileName = 
    sessionStorage.getItem('customer_nit')!=null ?
    sessionStorage.getItem('customer_nit')?.trim().trimStart().trimEnd()+"_"+fechaGeneracion.toString() : "";
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.GetAllBillByCompany('E');
  }

  GetAllBillByCompany(opt: string) {
    const customerguid = sessionStorage.getItem('customerguid')?.toString();
    const params = new DTE.Param();
    params.customerguid = customerguid;
    params.status = opt;

    this.dteService.GetAllBillByCompany(params).subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource<BillDTE[]>(result);
        this.dataSource.paginator = this.paginator;
        this.showSpinner = false;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyRangDate() {   
    this.dataSource =
      this.dataSource.filteredData.filter((x: { SubmitDte: Date; }) => {
        let submitDate: Date = new Date(x.SubmitDte);
        let startdate: Date = new Date(this.startDate);
        let enddate: Date = new Date(this.endDate);

        return submitDate >= startdate && submitDate <= enddate;
      });

    this.dataSource = new MatTableDataSource<BillDTE[]>(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  exportTable(){
     /**passing table id**/
     let data = document.getElementById('table-data');
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
 
     /**Generate workbook and add the worksheet**/
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'ReportFilter');
 
     /*save to file*/
     XLSX.writeFile(wb, `ReportFilter_${this.fileName}.xlsx`);
  }
}
