import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@shared/services/auth/auth.service';
import { Authenticate } from '@shared/models/entities/User';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleComponent } from '@shared/components/auth/title/title.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    TitleComponent,
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  authenticate: Authenticate = {
    username: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      alert('Invalid form, please fill all fields correctly');
      return;
    }

    this.authenticate = this.signInForm.value;

    this.authService.authenticate(this.authenticate).subscribe(
      (response: any) => {
        const token = response.token;

        localStorage.setItem('authToken', token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error signing in:', error);
        alert('Error signing in, please try again later');
      }
    );
  }
}
