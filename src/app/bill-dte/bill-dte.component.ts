import { Component, OnInit, ViewChild } from '@angular/core';

import { DteService } from '../dte.service';
import { BillDTE, DTE } from '../model/Entities';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-bill-dte',
  templateUrl: './bill-dte.component.html',
  styleUrls: ['./bill-dte.component.css'],
  //standalone: true,
  //imports: [MatTableModule],

})


export class BillDteComponent implements OnInit {
  ListDteBill: BillDTE[];
  //dataSourceOne : BillDTE[] =[] ;
  dataSource: any; //BillDTE[];
  showSpinner: boolean = false;
  spinnerValue: number = 0;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private dteService: DteService) {
    this.ListDteBill = [];
    this.dataSource = [];
    this.paginator;
  };

  /* displayedColumns: string[] = ['customerguid', 'NumeroControl',
    'CodigoGeneracion', 'RecLoc']; */

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
    'Estatus',

    //'Action'
  ];
  //this.dataSourceOne = ELEMENT_DATA;
  //dataSourceOne = ELEMENT_DATA;

  ngOnInit(): void {
    this.GetAllBillByCompany();
  }

  GetAllBillByCompany() {
    this.showSpinner = true;
    this.spinnerValue = 30;
    const customerguid = sessionStorage.getItem('customerguid')?.toString();
    const params = new DTE.Param();
    params.customerguid = customerguid;
    params.status = 'E';

    this.dteService.GetAllBillByCompany(params).subscribe((result: any) => {
      //ELEMENT_DATA_BILL;
      this.spinnerValue = 60;
      if (result) {
        this.spinnerValue = 100;
        //this.dataSource = result;
        this.dataSource = new MatTableDataSource<BillDTE[]>(result);
        this.dataSource.paginator = this.paginator;

        this.showSpinner = false;

      }
    });

  }
}


export interface _iBillDTE {
  customerguid: string;
  //add
  NumeroControl: string; //"DTE-01-02075433-000000000000001"
  CodigoGeneracion: string; //"4B02E281-8EA3-48D6-7704-0E0014D42229"
  //end
  RecLoc: string;
  SegSeqNbr: number;
  NbrOfPax: number;
  ArcIata: string;
  FirstName: string;
  LastName: string;
  Email: string;
  BookingDate: Date;
  FlightDate: Date;
  SegmentOrigin: string;
  SegmentDest: string;
  Base: number;
  CurrencyBase: string;
  SV: number;
  Status: string;
}


//let ELEMENT_DATA: BillDTE[] = [];
//const ELEMENT_DATA: BillDTE[] =  ListDteBill;


/* const ELEMENT_DATA: BillDTE[] = [
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}, 
]; */
