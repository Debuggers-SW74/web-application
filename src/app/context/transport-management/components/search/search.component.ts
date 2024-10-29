import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ResultCardComponent } from '../result-card/result-card.component';
import { CommonModule } from '@angular/common';
import { ResultDriver } from '../../models/ResultDriver';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ResultCardComponent,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() changeStep = new EventEmitter<void>();

  results: ResultDriver[] = [
    {
      id: 1,
      name: 'John',
      firstLastName: 'Doe',
      secondLastName: 'Doe',
      phone: '123456789',
    },
    {
      id: 2,
      name: 'Jane',
      firstLastName: 'Doe',
      secondLastName: 'Doe',
      phone: '987654321',
    },
  ];

  onBookTrip() {
    this.changeStep.emit();
  }
}
