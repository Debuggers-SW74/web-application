import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '@shared/services/user/user.service';
import { User } from '@app/shared/models/entities/User';
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
  providers: [UserService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      alert('Invalid form, please fill all fields correctly');
      return;
    }

    const { email, password } = this.signInForm.value;

    this.userService.signIn(email, password).subscribe(
      (user: User) => {
        console.log('User signed in successfully:', user);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error signing in:', error);
        alert('Error signing in, please try again later');
      }
    );
  }
}
