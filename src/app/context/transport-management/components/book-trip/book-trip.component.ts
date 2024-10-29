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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Trip } from '@app/shared/models/entities/Trip';
import { TripStatus } from '@app/shared/models/enum/trip-status';
import { TripService } from '@app/shared/services/trip/trip.service';

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
  providers: [provideNativeDateAdapter(), TripService],
  templateUrl: './book-trip.component.html',
  styleUrl: './book-trip.component.css',
})
export class BookTripComponent {
  bookTripForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripService
  ) {}

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

  submit(): void {
    if (this.bookTripForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }

    this.tripService
      .create('trips', {
        ...this.bookTripForm.value,
        status: TripStatus.Pending,
      })
      .subscribe(
        (trip: Trip) => {
          console.log('Trip created successfully:', trip);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log('Error creating trip:', error);
          alert('Error creating trip, please try again later');
        }
      );
  }

  // TODO: Check if this is needed
  // formatTime(date: Date): string {
  //   const hours = date.getHours().toString().padStart(2, '0'); // Devuelve el formato de horas
  //   const minutes = date.getMinutes().toString().padStart(2, '0'); // Devuelve el formato de minutos
  //   return `${hours}:${minutes}`; // Formato HH:mm
  // }

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
