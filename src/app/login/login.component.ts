import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CustomerService } from '../customer.service';
import { Customer, User } from '../model/Entities';
import { md5 } from 'js-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  /*   formLogin = new FormGroup({
      'email': new FormControl('',[ Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    }); */

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
 // user_params: User.Param

  constructor(
    private fb: FormBuilder,
    private loginService: UserService,
    private customerServices: CustomerService,
    private router: Router
  ) {
    //this.user_params = new User.Param();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const user_params: User.Param = this.loginForm.value;
    user_params.password = md5(user_params.password ?? '');
    //user_params.username = md5(user_params.username ?? '');

    this.loginService.getUserByPassword(user_params).subscribe(
      (data: User) => {
        // Manejar la respuesta del API        
        if (data && data.userguid) {
          this.customerServices.GetCustomerByCompanyguid({ customerguid: data.customerguid }).subscribe(
            (customer: any) => {
              if (customer) {
                this.dataSave(data, customer[0]);
                this.router.navigate(['/dte-bill']);
              }
            }
          );
        } else {
          this.errorMessage = 'Usuario o password invalidos';
        }
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error de coneccion!';
        this.loading = false;
      }
    );
  };

  dataSave(user: User, customer: Customer) {

    sessionStorage.setItem('customerguid', customer.customerguid);
    sessionStorage.setItem('customer_nit', customer.nit);
    sessionStorage.setItem('customer_nombre', customer.nombre);

    sessionStorage.setItem('userapi', customer.userapi); // '94501110101012';
    sessionStorage.setItem('passwordauth', customer.passwordauth); //'SpiritAirline@2023';
    sessionStorage.setItem('passwordfirmardocumento', customer.passwordfirmardocumento);  //'impuestos2016';

    sessionStorage.setItem('userguid', user.userguid);
    sessionStorage.setItem('usercodigo', user.codigo);
    sessionStorage.setItem('usernombre', user.nombre);
  }
  deleteAll() {
    sessionStorage.clear();
  }

} 