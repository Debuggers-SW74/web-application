import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-information',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './fill-information.component.html',
  styleUrl: './fill-information.component.css'
})
export class FillInformationComponent {
  fillInformationForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router
  ) {}

  submit() {
    console.log('Fill Information Submitted');
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.fillInformationForm = this.formBuilder.group({
      name: [''],
      phoneNumber: [''],
      termsConditions: [false],
      information: [false],
    })
  }
}
