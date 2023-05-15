import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { AuthenticateModel } from '../../data-models/authenticate.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../data-models/register.model';

@Component({
  selector: 'course-project-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements DoCheck {
  @Output() submit = new EventEmitter<RegisterModel>();

  ngDoCheck(): void {
    console.log('Register Form Check');
  }
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register() {
    this.submit.emit({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    } as RegisterModel);
  }
}
