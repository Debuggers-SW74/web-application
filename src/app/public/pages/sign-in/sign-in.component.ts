import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {

  signInForm!: FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  signIn() {
    this.router.navigate(['/home']);
  }
}
