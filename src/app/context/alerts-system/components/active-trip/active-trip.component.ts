import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-active-trip',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './active-trip.component.html',
  styleUrl: './active-trip.component.css'
})
export class ActiveTripComponent {
  driver = {
    name: 'Driver 1',
    from: 'Ubicación inicial',
    to: "Ubicación final",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg",
    phone: "987654321"
  }
}
