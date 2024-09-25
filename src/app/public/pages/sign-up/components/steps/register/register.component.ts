import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserRegistration } from '@shared/models/entities/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Input() onSubmit!: () => void;
  @Output() onSubmitted = new EventEmitter<UserRegistration>();

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  submit() {
    if (this.registerForm.invalid) {
      alert('Please fill all the fields');
      return;
    }
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      alert('Passwords do not match');
      return;
    }
    this.onSubmitted.emit({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    });
    console.log('Register Submitted');
    this.onSubmit();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
