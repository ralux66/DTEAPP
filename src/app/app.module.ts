import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillDteComponent } from './bill-dte/bill-dte.component';

import { HttpClientModule } from '@angular/common/http';

import { ProcessBillComponent } from './process-bill/process-bill.component';
import { MainMenuBarComponent } from './main-menu-bar/main-menu-bar.component';
import { FilePickerModule } from 'ngx-awesome-uploader';

import { MaterialModule } from './material.module';
import { SendBillComponent } from './send-bill/send-bill.component';
import { LogCaseComponent } from './log-case/log-case.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuBarComponent,
    BillDteComponent,
    ProcessBillComponent,
    SendBillComponent,
    LogCaseComponent,
    LoginComponent,
    UserComponent,
    CustomerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialModule,
    FilePickerModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
