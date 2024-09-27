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
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-trip',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './book-trip.component.html',
  styleUrl: './book-trip.component.css',
})
export class BookTripComponent {
  bookTripForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  submit() {
    if (this.bookTripForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }
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
      To: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      weight: [0, [Validators.required]],
      date: [new Date(), [Validators.required]], // Asignando la fecha actual
      departureTime: [this.formatTime(new Date()), [Validators.required]], // Hora de salida
      arrivalTime: [this.formatTime(new Date()), [Validators.required]], // Hora de llegada
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
