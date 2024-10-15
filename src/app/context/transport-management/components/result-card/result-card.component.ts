import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
import { ResultDriver } from '../../models/ResultDriver';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.css',
})
export class ResultCardComponent {
  @Input() resultDriver!: ResultDriver;
}
