import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AutoTabDirective } from '@shared/lib/auto-tab.directive';

@Component({
  selector: 'app-sensor-code',
  standalone: true,
  imports: [AutoTabDirective, MatButtonModule, ReactiveFormsModule],
  templateUrl: './sensor-code.component.html',
  styleUrl: './sensor-code.component.css',
})
export class SensorCodeComponent implements OnInit {
  @Input() onSubmit!: () => void;
  sensorCodeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sensorCodeForm = this.formBuilder.group({
      input1: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]],
      input4: ['', [Validators.required]],
      input5: ['', [Validators.required]],
      input6: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.sensorCodeForm.invalid) {
      alert('Invalid code, please fill all fields correctly');
      return;
    }

    const enteredCode = Object.values(this.sensorCodeForm.value).join('');

    console.log('Entered Code:', enteredCode);
    this.onSubmit();
  }
}
