import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-trip',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-trip.component.html',
  styleUrl: './book-trip.component.css',
})
export class BookTripComponent {
  bookTripForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  locationList: string[] = [
    'Carabayllo',
    'Pte Piedra',
    'Comas',
    'Los Olivos',
    'San Isidro',
    'San Miguel',
    'Miraflores',
  ];

  hazardousMaterialList: string[] = [
    'GNV',
    'DIESEL',
    'GAS',
    'OIL',
    'PROPANE',
    'PETROL',
    'OTHER',
  ];

  minDate: Date = new Date();

  submit() {
    if (this.bookTripForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }
    console.log(this.bookTripForm.value);
    this.router.navigate(['/home']);
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0'); // Devuelve el formato de horas
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Devuelve el formato de minutos
    return `${hours}:${minutes}`; // Formato HH:mm
  }

  ngOnInit(): void {
    this.bookTripForm = this.formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(50)]],
      date: [null, [Validators.required]], // Asignando la fecha actual
      departureTime: ['', [Validators.required]], // Hora de salida
      arrivalTime: ['', [Validators.required]], // Hora de llegada
      subject: [''],
      description: [''],
    });
  }
}
