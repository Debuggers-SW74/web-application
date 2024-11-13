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
import { Profile, User, Driver } from '@shared/models/entities/User';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserService } from '@app/shared/services/user/user/user.service';

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
  driver: Driver | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    const endpoint = userType === 'ROLE_DRIVER' ? 'drivers' : 'supervisors';

    if (userType === 'ROLE_DRIVER') {
      this.userService.getDriverById(userId as number).subscribe({
        next: (response: Driver) => {
          console.log('Driver obtenido:', response);
          this.user = response;
          this.driver = response;
          this.initForm();
        },
        error: (err) => {
          console.error('Error fetching driver data:', err);
        },
      });
    } else {
      this.userService.getById(endpoint, userId as number).subscribe({
        next: (response: User) => {
          console.log('Usuario obtenido:', response);
          this.user = response;
          this.initForm();
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
    }
  }

  initForm(): void {
    this.editProfileForm = this.formBuilder.group({
      name: [this.user?.name || '', [Validators.minLength(3)]],
      firstLastName: [
        this.user?.firstLastName || '',
        [Validators.minLength(3)],
      ],
      secondLastName: [
        this.user?.secondLastName || '',
        [Validators.minLength(3)],
      ],
      email: [this.user?.email || '', [Validators.email]],
      password: ['', [Validators.minLength(8)]],
      phone: [this.user?.phone || '', [Validators.minLength(9)]],
    });
  }

  submit() {
    if (this.editProfileForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }

    const { password, ...profile } = this.editProfileForm.value;

    const userType = this.authService.getUserTypeFromToken();

    const endpoint = userType === 'ROLE_DRIVER' ? 'drivers' : 'supervisors';

    if (userType === 'ROLE_DRIVER') {
      const updateDriver: Driver = {
        ...profile,
        ...(this.editProfileForm.value.password !== ''
          ? { password: this.editProfileForm.value.password }
          : {}),
        username: this.driver?.username as string,
        id: this.driver?.id as number,
        supervisorId: this.driver?.supervisorId as number,
      };

      this.userService.updateDriver(updateDriver).subscribe({
        next: (response: Driver) => {
          console.log('Driver updated:', response);
        },
        error: (err) => {
          console.error('Error updating driver:', err);
        },
      });
    } else {
      const updateUser: User = {
        ...profile,
        ...(this.editProfileForm.value.password !== ''
          ? { password: this.editProfileForm.value.password }
          : {}),
        username: this.user?.username as string,
        id: this.user?.id as number,
      };

      this.userService.update(endpoint, updateUser, true).subscribe({
        next: (response: User) => {
          console.log('Supervisor updated:', response);
        },
        error: (err) => {
          console.error('Error updating driver:', err);
        },
      });
    }

    alert('Edit Profile Successfully');
  }
}
