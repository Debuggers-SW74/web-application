import { Component } from '@angular/core';
import { User } from '@shared/models/entities/User';
import { Role } from '@app/shared/models/enum/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css',
})
export class DriverCardComponent {
  drivers: User[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Arona',
      phoneNumber: '98721463',
      email: 'juan.arona@gmail.com',
      password: '123456',
      role: Role.Driver,
    },
  ];
}
