import { Component, OnInit } from '@angular/core';
//import { NgIf, NgFor } from '@angular/common';
import { BillDTE, DTE, SubmiteDTE } from '../model/Entities';
import { DteService } from '../dte.service';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


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
    'Estatus',
    'Action'
  ];
  dataSource: BillDTE[] = []; //ELEMENT_DATA;
  clickedRows = new Set<BillDTE>();
  showSpinner: boolean = false;
  spinnerValue: number = 0;
  constructor(private dteService: DteService, public dialog: MatDialog) {
  };


  ngOnInit(): void {
    this.GetAllPendinBill();
  }

  GetAllPendinBill() {
    let bill_params: DTE.Param = new DTE.Param();
    bill_params.customerguid = '123e4567-e89b-12d3-a456-426655440000';
    bill_params.status = 'P';
    this.dteService.GetAllBillPending(bill_params).subscribe((result: BillDTE[]) => {
      this.dataSource = result;
    });
  }

  SubmiteDTE(element: BillDTE) {
    this.showSpinner = true;
    this.spinnerValue = 40;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    submit_params.companynit = '94501110101012';
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

    this.dteService.SubmitDTE(submit_params).subscribe({
      next: (v) => {  this.spinnerValue = 80;  this.GetAllPendinBill(); },
      error: (e) => {
        this.spinnerValue = 80; 
        this.openDialog('0ms', '0ms');
        this.GetAllPendinBill();
        
      },
      complete: () => {
        this.showSpinner=false; 
        this.openDialog('0ms', '0ms');
        this.GetAllPendinBill();
      }
    });
  }


  SubmiteAllDTE() {

    this.spinnerValue = 40;
    let submit_params: SubmiteDTE.Param;
    submit_params = new SubmiteDTE.Param();
    submit_params.companynit = '94501110101012';
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

    this.dteService.SubmiteAllDTE(submit_params).subscribe({
      next: (v) => {   this.spinnerValue = 80; },
      error: (e) => {
        this.showSpinner=false; 
        this.openDialog('0ms', '0ms');
        this.GetAllPendinBill();
      },
      complete: () => {
        this.showSpinner=false; 
        this.openDialog('0ms', '0ms');
        this.GetAllPendinBill();
      }
    });
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