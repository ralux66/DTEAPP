import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillDteComponent } from './bill-dte/bill-dte.component';


import { ProcessBillComponent } from './process-bill/process-bill.component';

import { SendBillComponent } from './send-bill/send-bill.component';
import { LogCaseComponent } from './log-case/log-case.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  //

  { path: 'send-bill', component: SendBillComponent },
  { path: '', component: BillDteComponent }, //historico
  { path: 'dte-bill', component: BillDteComponent }, //historico

  { path: 'proces-bill', component: ProcessBillComponent },
  { path: 'log-case', component: LogCaseComponent },
  { path: 'loging', component: LoginComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'user', component: UserComponent },
  // { path: '**', component: MainMenuBarComponent},
  //{ path: '', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
