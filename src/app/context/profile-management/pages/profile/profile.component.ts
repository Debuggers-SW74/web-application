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
import { MatInputModule } from '@angular/material/input';
import { Role } from '@app/shared/models/enum/role';
import { Profile, User } from '@shared/models/entities/User';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editProfileForm!: FormGroup;

  user: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+51 987654321',
    email: 'john.doe@gmail.com',
    password: '123456',
    role: Role.Driver,
  };

  constructor(private formBuilder: FormBuilder) {}

  submit() {
    if (this.editProfileForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }

    let profile: Profile = {
      firstName: this.editProfileForm.value.firstName,
      lastName: this.editProfileForm.value.lastName,
      email: this.editProfileForm.value.email,
      password: this.editProfileForm.value.password,
      phoneNumber: this.editProfileForm.value.phoneNumber,
    };

    console.log('Edit Profile Successfully');
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
    });
  }
}
