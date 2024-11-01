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

  constructor(private formBuilder: FormBuilder) {}

  submit() {
    if (this.fillInformationForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }
    this.onSubmitted.emit({
      name: this.fillInformationForm.value.name,
      firstLastName: this.fillInformationForm.value.firstLastName,
      secondLastName: this.fillInformationForm.value.secondLastName,
      phone: this.fillInformationForm.value.phone,
      termsConditions: this.fillInformationForm.value.termsConditions,
      information: this.fillInformationForm.value.information,
    });
    console.log('Fill Information Submitted');
  }

  ngOnInit(): void {
    this.fillInformationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      firstLastName: ['', [Validators.required, Validators.minLength(3)]],
      secondLastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      termsConditions: [false, [Validators.required]],
      information: [false, [Validators.required]],
    });
  }
}
