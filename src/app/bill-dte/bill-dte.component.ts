import { Component, OnInit, ViewChild } from '@angular/core';
import { DteService } from '../dte.service';
import { BillDTE, DTE, GeneratePDF, SubmiteDTE } from '../model/Entities';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  searchconting: boolean = false;
  searchanulados: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dteService: DteService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.ListDteBill = [];
    this.dataSource = [];
    this.paginator;
  }

  /* displayedColumns: string[] = ['customerguid', 'NumeroControl',
    'CodigoGeneracion', 'RecLoc']; */

  displayedColumns: string[] = [
    'RecLoc',
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
    //'GenerarPDF',
    'Action',
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
    params.status = this.searchconting ? 'C' : this.searchanulados ? 'N' : 'E';

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

  AnularFactura(element: BillDTE) {
    this.showSpinner = true;
    this.spinnerValue = 30;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    //submit_params.companynit = '94501110101012';
    submit_params.companynit = sessionStorage
      .getItem('customer_nit')
      ?.toString();
    submit_params.customerguid = sessionStorage
      .getItem('customerguid')
      ?.toString();
    submit_params.userapi = sessionStorage.getItem('userapi')?.toString(); // '94501110101012';
    submit_params.passwordauth = sessionStorage
      .getItem('passwordauth')
      ?.toString(); //'SpiritAirline@2023';
    submit_params.passwordfirmardocumento = sessionStorage
      .getItem('passwordfirmardocumento')
      ?.toString(); //'impuestos2016';
    submit_params.status = 'E';
    submit_params.NumeroControl = element.NumeroControl;

    this.dteService.Anulardte(submit_params).subscribe((result: any) => {
      if (result) {
        this.spinnerValue = 80;
        this.showSpinner = false;
        this.openDialog('0ms', '0ms');
        this.router.navigate(['/dte-bill']);
        //this.GetAllPendinBill();
      } else {
        this.showSpinner = false;
        this.openDialog('0ms', '0ms');
      }
    });
  }

  GeneratePDF(element: BillDTE) {
    const objGeneratePDF: GeneratePDF = new GeneratePDF();
    objGeneratePDF.customerguid = sessionStorage
      .getItem('customerguid')
      ?.toString();
    objGeneratePDF.NumeroControl = element.NumeroControl;
    objGeneratePDF.receptorguid = '';

    this.dteService.GeneratePDF(objGeneratePDF).subscribe((resultPDF) => {
      if (resultPDF) {
        this.openDialog('0ms', '0ms');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-templay',
  templateUrl: '../Utility/dialog-templay.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
