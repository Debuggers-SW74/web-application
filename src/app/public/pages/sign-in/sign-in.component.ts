import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { TitleComponent } from '@shared/components/auth/title/title.component';
import { Authenticate } from '@shared/models/entities/User';
import { UserService } from '@shared/services/user/user.service';

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
  ],
  providers: [UserService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  authenticate: Authenticate = {
    email: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['oc@gm.com', [Validators.required, Validators.email]],
      password: ['ocanellas', Validators.required],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      alert('Invalid form, please fill all fields correctly');
      return;
    }

    this.authenticate = this.signInForm.value;

    this.userService.authenticate(this.authenticate).subscribe(
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
