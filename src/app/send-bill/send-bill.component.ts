import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BillDTE, DTE, SubmiteDTE } from '../model/Entities';
import { DteService } from '../dte.service';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-send-bill',
  templateUrl: './send-bill.component.html',
  styleUrls: ['./send-bill.component.css']
})
export class SendBillComponent implements OnInit {
  animal: string;
  name: string;
  sendcontingencia: boolean = false;
  searchconting: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "RecLoc",
    'Dte-Number',
    'CodigoGeneracion',
    'FirstName',
    'LastName',
    'BookingDate',
    /* 'ArcIata',
      */
    /*  
     'FlightDate', */
    //'SegmentOrigin',
    //'SegmentDest',
    'Base',
    'SV',
    'BatchTransaction',
    'Estatus',
    'Action',
    //'Alter'
  ];

  dataSource: any;  //BillDTE[] = []; //ELEMENT_DATA;
  clickedRows = new Set<BillDTE>();
  showSpinner: boolean = false;
  spinnerValue: number = 0;

  constructor(private dteService: DteService, public dialog: MatDialog, private router: Router) {
    this.animal = '';
    this.name = '';
  };

  ngOnInit(): void {
    this.GetAllPendinBill();
  }

  GetAllPendinBill() {
    this.showSpinner = true;
    this.spinnerValue = 30;
    let bill_params: DTE.Param = new DTE.Param();
    bill_params.customerguid = sessionStorage.getItem('customerguid')?.toString();;
    bill_params.status = this.searchconting ? 'C' : 'P';
    this.dteService.GetAllBillPending(bill_params).subscribe((result: any) => {
      this.spinnerValue = 60;
      if (result) {
        this.spinnerValue = 100;
       
        this.dataSource = new MatTableDataSource<BillDTE[]>(result);
        this.dataSource.paginator = this.paginator;

        this.showSpinner = false;
      }

    });
  }

  SubmiteDTE(element: string) {
    this.showSpinner = true;
    this.spinnerValue = 30;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    //submit_params.companynit = '94501110101012';
    submit_params.companynit = sessionStorage.getItem('customer_nit')?.toString();
    submit_params.customerguid = sessionStorage.getItem('customerguid')?.toString();
    submit_params.userapi = sessionStorage.getItem('userapi')?.toString(); // '94501110101012';
    submit_params.passwordauth = sessionStorage.getItem('passwordauth')?.toString(); //'SpiritAirline@2023';
    submit_params.passwordfirmardocumento = sessionStorage.getItem('passwordfirmardocumento')?.toString();  //'impuestos2016';
    submit_params.status = 'P';
    submit_params.NumeroControl = element;

    this.dteService.SubmitDTE(submit_params).subscribe((result: any) => {
      if (result) {
        this.spinnerValue = 80;
        this.showSpinner = false;
        this.openDialog();
        this.router.navigate(['/dte-bill']);
        //this.GetAllPendinBill();
      } else {
        this.showSpinner = false;
        this.openDialog();
      }
    });

  }

  SubmiteAllDTE(element: string) {
    if (this.sendcontingencia) {
      this.SubmiteContingencia(element);
    } else {
      this.spinnerValue = 40;
      let submit_params: SubmiteDTE.Param;
      submit_params = new SubmiteDTE.Param();
      submit_params.companynit = sessionStorage.getItem('customer_nit')?.toString();
      submit_params.customerguid = sessionStorage.getItem('customerguid')?.toString();
      submit_params.userapi = sessionStorage.getItem('userapi')?.toString(); // '94501110101012';
      submit_params.passwordauth = sessionStorage.getItem('passwordauth')?.toString(); //'SpiritAirline@2023';
      submit_params.passwordfirmardocumento = sessionStorage.getItem('passwordfirmardocumento')?.toString();  //'impuestos2016';
      submit_params.status = this.searchconting ? 'C' : 'P';
      submit_params.NumeroControl = element != 'null' ? element : '';

      this.dteService.SubmiteAllDTE(submit_params).subscribe((result: any) => {
        if (result) {
          this.spinnerValue = 80;
          this.showSpinner = false;
          this.router.navigate(['/dte-bill']);
        } else {
          this.showSpinner = false;
        }
      });
    }
  }

  SubmiteContingencia(element: string) {
    this.spinnerValue = 40;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    submit_params.companynit = sessionStorage.getItem('customer_nit')?.toString();
    submit_params.customerguid = sessionStorage.getItem('customerguid')?.toString();
    submit_params.userapi = sessionStorage.getItem('userapi')?.toString(); // '94501110101012';
    submit_params.passwordauth = sessionStorage.getItem('passwordauth')?.toString(); //'SpiritAirline@2023';
    submit_params.passwordfirmardocumento = sessionStorage.getItem('passwordfirmardocumento')?.toString();  //'impuestos2016';
    submit_params.status = 'P';
    submit_params.NumeroControl = element != 'null' ? element : '';

    this.dteService.SubmiteContingencia(submit_params).subscribe((result: any) => {
      if (result) {
        this.spinnerValue = 80;
        this.showSpinner = false;
        this.router.navigate(['/dte-bill']);
      } else {
        this.showSpinner = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ReloadGrid() {
    this.router.navigate(['/send-bill']);
  }

}

@Component({
  selector: 'dialog-templay',
  templateUrl: '../Utility/dialog-templay.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../Utility/dialog-overview-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}