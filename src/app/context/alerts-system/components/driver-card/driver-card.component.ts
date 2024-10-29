import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/entities/User';
import { CommonModule } from '@angular/common';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css',
})
export class DriverCardComponent implements OnInit {
  drivers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll('drivers').subscribe({
      next: (response: User[]) => {
        console.log('Drivers obtenidos:', response);
        this.drivers = response.slice(0, 2);
      },
      error: (err) => {
        console.error('Error fetching drivers data:', err);
      },
    });
  }
}
