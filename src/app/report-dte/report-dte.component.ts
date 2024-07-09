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
  dataSourceFilter:any[]=[]; 
  showSpinner: boolean = false;
  startDate!: Date | null;
  endDate!: Date | null;
  fileName: string;
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
    let fechaGeneracion: Date = new Date();
    this.fileName =
      sessionStorage.getItem('customer_nit') != null ?
        sessionStorage.getItem('customer_nit')?.trim().trimStart().trimEnd() + "_" +fechaGeneracion.getTime() : "";
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.GetAllBillByCompany('E');
  }

  GetAllBillByCompany(opt: string) {
    this.showSpinner=true;
    const customerguid = sessionStorage.getItem('customerguid')?.toString();
    const params = new DTE.Param();
    params.customerguid = customerguid;
    params.status = opt;

    this.dteService.GetAllBillByCompany(params).subscribe((result: any) => {      
      if (result) {
        this.dataSourceFilter = result;
        this.dataSource = new MatTableDataSource<BillDTE[]>(result);
        this.dataSource.paginator = this.paginator;        
      }
      this.showSpinner = false;
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyRangDate() {
    if (this.startDate != null && this.endDate != null) {
      this.dataSourceFilter =
        this.dataSource.filteredData.filter((x: { SubmitDte: Date; }) => {
          let submitDate: Date = new Date(x.SubmitDte);
          let startdate: Date = new Date(this.startDate ?? Date.now());
          let enddate: Date = new Date(this.endDate ?? Date.now());

          return submitDate >= startdate && submitDate <= enddate;
        });
    }

    this.dataSource = new MatTableDataSource<BillDTE[]>(this.dataSourceFilter);
    this.dataSource.paginator = this.paginator;
  }

  resetAll() {
    this.startDate = null;
    this.endDate = null;
    this.GetAllBillByCompany('E');
  }

  exportTable() {
    /**passing table id**/
    //let data = document.getElementById('table-data');

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSourceFilter);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ReportFilter');

    /*save to file*/
    XLSX.writeFile(wb, `ReportFilter_${this.fileName}.xlsx`);
  }
}
