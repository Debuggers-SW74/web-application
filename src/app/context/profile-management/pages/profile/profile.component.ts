import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Profile, User } from '@shared/models/entities/User';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editProfileForm!: FormGroup;

  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const userId = this.authService.getUserIdFromToken() ?? 0;
    const userType = this.authService.getUserTypeFromToken();

    const endpoint = userType === 'ROLE_DRIVER' ? 'drivers' : 'supervisors';

    this.userService.getById(endpoint, userId).subscribe({
      next: (response: User) => {
        console.log('Usuario obtenido:', response);
        this.user = response;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  initForm(): void {
    this.editProfileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      firstLastName: ['', [Validators.required, Validators.minLength(3)]],
      secondLastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  submit() {
    if (this.editProfileForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }

    const profile: Profile = this.editProfileForm.value;

    console.log('Edit Profile Successfully');
  }
}
