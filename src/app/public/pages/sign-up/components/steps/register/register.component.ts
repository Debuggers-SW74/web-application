import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Input() onSubmit!: () => void;

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  submit() {
    this.onSubmit();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }
}
