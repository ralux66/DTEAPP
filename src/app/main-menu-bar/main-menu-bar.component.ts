import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillDTE, DTE } from '../model/Entities';
import { DteService } from '../dte.service';

@Component({
  selector: 'app-main-menu-bar',
  templateUrl: './main-menu-bar.component.html',
  styleUrls: ['./main-menu-bar.component.css'],
  //standalone: true,
  //imports: [MaterialModule],
})
export class MainMenuBarComponent implements OnInit {
  company_name?: string;
  company_nit?: string;
  user_name?: string;
  badgevisible = false;
  bill_params: DTE.Param = new DTE.Param();
  matBadge: number = 0;
  constructor(private router: Router, private dteService: DteService) {
    this.company_nit = '';
    this.company_name = '';
    this.user_name = '';
  }

  ngOnInit(): void {
    const customernit = sessionStorage.getItem('customer_nit')?.toString();
    const company_name = sessionStorage.getItem('customer_nombre')?.toString();
    const usuario_nombre = sessionStorage.getItem('usernombre')?.toString();
    this.company_nit = customernit;
    this.company_name = company_name;
    this.user_name = usuario_nombre;
    this.GetAllPendinBill();
  }

  badgevisibility() {
    this.badgevisible = true;
  }

  deleteSession() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  GetAllPendinBill() {
    this.bill_params.customerguid = sessionStorage
      .getItem('customerguid')
      ?.toString();
    this.bill_params.status = 'P';
    this.dteService
      .GetAllBillPending(this.bill_params)
      .subscribe((result: BillDTE[]) => {
        if (result) {
          this.matBadge = result.length;
        }
      });
  }
}
