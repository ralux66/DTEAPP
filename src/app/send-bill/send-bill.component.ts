import { Component, OnInit } from '@angular/core';
//import { NgIf, NgFor } from '@angular/common';
import { BillDTE, DTE, SubmiteDTE } from '../model/Entities';
import { DteService } from '../dte.service';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-send-bill',
  templateUrl: './send-bill.component.html',
  styleUrls: ['./send-bill.component.css']
})
export class SendBillComponent implements OnInit {
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
    'Action'
  ];
  dataSource: BillDTE[] = []; //ELEMENT_DATA;
  clickedRows = new Set<BillDTE>();
  showSpinner: boolean = false;
  spinnerValue: number = 0;
  constructor(private dteService: DteService, public dialog: MatDialog,private router: Router) {
  };


  ngOnInit(): void {
    this.GetAllPendinBill();
  }

  GetAllPendinBill() {
    let bill_params: DTE.Param = new DTE.Param();
    bill_params.customerguid = sessionStorage.getItem('customerguid')?.toString();;
    bill_params.status = 'P';
    this.dteService.GetAllBillPending(bill_params).subscribe((result: BillDTE[]) => {
      this.dataSource = result;
    });
  }

  SubmiteDTE(element: BillDTE) {
    this.showSpinner = true;
    this.spinnerValue = 30;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    //submit_params.companynit = '94501110101012';
    submit_params.companynit = sessionStorage.getItem('customer_nit')?.toString();
    submit_params.customerguid = sessionStorage.getItem('customerguid')?.toString();
    submit_params.userAPI = '94501110101012';
    submit_params.passwordAuth = 'SpiritAirline@2023';
    submit_params.passwordFirmardocumento = 'impuestos2016';
    submit_params.status = 'P';
    submit_params.NumeroControl = element.NumeroControl;


    /*    this.dteService.SubmitDTE(submit_params).subscribe(
         (result: any) => {
           this.showSpinner = true;
           return result;
         });
    */
    this.dteService.SubmiteAllDTE(submit_params).subscribe((result: any) => {
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
    /* this.dteService.SubmitDTE(submit_params).subscribe({

      next: (v) => { this.spinnerValue = 60; },
      error: (e) => {
        this.spinnerValue = 100;
        this.showSpinner = false;
        this.openDialog('0ms', '0ms');
        this.GetAllPendinBill();

      },
      complete: () => {
        this.spinnerValue = 100;
        this.showSpinner = false;
        this.openDialog('0ms', '0ms');
        this.GetAllPendinBill();
      }
    }); */
  }


  SubmiteAllDTE() {

    this.spinnerValue = 40;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    submit_params.companynit = sessionStorage.getItem('customer_nit')?.toString();
    submit_params.customerguid = sessionStorage.getItem('customerguid')?.toString();
    submit_params.userAPI = '94501110101012';
    submit_params.passwordAuth = 'SpiritAirline@2023';
    submit_params.passwordFirmardocumento = 'impuestos2016';
    submit_params.status = 'P';
    //submit_params.NumeroControl = element.NumeroControl;


    /*    this.dteService.SubmitDTE(submit_params).subscribe(
         (result: any) => {
           this.showSpinner = true;
           return result;
         });
    */
    this.dteService.SubmiteAllDTE(submit_params).subscribe((result: any) => {
      if (result) {
        this.spinnerValue = 80;
        this.showSpinner = false;
        this.router.navigate(['/dte-bill']);
      } else {
        this.showSpinner = false;
      }
    });
    /*  this.dteService.SubmiteAllDTE(submit_params).subscribe({
       next: (v) => { this.spinnerValue = 80; },
       error: (e) => {
         this.showSpinner = false;
         this.openDialog('0ms', '0ms');
         this.GetAllPendinBill();
       },
       complete: () => {
         this.showSpinner = false;
         this.openDialog('0ms', '0ms');
         this.GetAllPendinBill();
       }
     }); */
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
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
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}