import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleTripComponent } from "../../components/idle-trip/idle-trip.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IdleTripComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  alert: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
