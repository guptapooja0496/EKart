import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pdValidator } from '../validators/validators.module';
import { AuthManagerService } from '../auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService, private router: Router) { }

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;


  onRegister() {
    if (this.registerForm.value.registerType == "seller") {
      this.service.sellerRegister(this.registerForm.value)
        .subscribe(data => {
          this.successMessage = "Account is successfully registered!";
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessage = "Registered failed, please again!";
        })
    } else {  // registerType is customer
      this.service.customerRegister(this.registerForm.value)
        .subscribe(data => {
          this.successMessage = "Account is successfully registered!";
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessage = "Registered failed, please again!";
        })
    }

  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, pdValidator]],
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      registerType: ["seller", Validators.required]
    })
  }
}

