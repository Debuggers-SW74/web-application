import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserInformation } from '@shared/models/entities/User';

@Component({
  selector: 'app-fill-information',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './fill-information.component.html',
  styleUrl: './fill-information.component.css',
})
export class FillInformationComponent {
  fillInformationForm!: FormGroup;
  @Output() onSubmitted = new EventEmitter<UserInformation>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  submit() {
    if (this.fillInformationForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }
    this.onSubmitted.emit({
      firstName: this.fillInformationForm.value.firstName,
      lastName: this.fillInformationForm.value.lastName,
      phoneNumber: this.fillInformationForm.value.phoneNumber,
      termsConditions: this.fillInformationForm.value.termsConditions,
      information: this.fillInformationForm.value.information,
    });
    console.log('Fill Information Submitted');
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.fillInformationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      termsConditions: [false, [Validators.required]],
      information: [false, [Validators.required]],
    });
  }
}
