import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PendingTripsComponent } from '../../components/pending-trips/pending-trips.component';
import { HistoryComponent } from '../../components/history/history.component';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [MatTabsModule, PendingTripsComponent, HistoryComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {}
