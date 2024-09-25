import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from "../trip-card/trip-card.component";
import { DriverCardComponent } from "../driver-card/driver-card.component";

@Component({
  selector: 'app-idle-trip',
  standalone: true,
  imports: [CommonModule, TripCardComponent, DriverCardComponent],
  templateUrl: './idle-trip.component.html',
  styleUrl: './idle-trip.component.css'
})
export class IdleTripComponent {
  drivers = [
    { name: 'Driver 1', from: 'Ubicación inicial', to: "Ubicación final", img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg" },
    { name: 'Driver 2', from: 'Ubicación inicial', to: "Ubicación final", img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg" },
    { name: 'Driver 3', from: 'Ubicación inicial', to: "Ubicación final", img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg" }
  ];
}
