import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ResultCardComponent } from '../result-card/result-card.component';
import { CommonModule } from '@angular/common';
import { ResultDriver } from '../../models/ResultDriver';
import { DriverService } from '@shared/services/user/driver/driver.service';
import { SupervisorService } from '@shared/services/user/supervisor/supervisor.service';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ResultCardComponent,
    CommonModule,
  ],
  providers: [DriverService, SupervisorService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Output() changeStep = new EventEmitter<ResultDriver>();

  nameOrSensorCode: string = '';
  resultDriver: ResultDriver | null = null;

  results: ResultDriver[] = [];

  constructor(
    private driverService: DriverService,
    private supervisorServisor: SupervisorService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();

    this.supervisorServisor
      .getDriversBySupervisorId(userId as number)
      .subscribe({
        next: (response: ResultDriver[]) => {
          if (response) {
            this.results = response;
          }
        },
        error: (err) => {
          console.error('Error fetching drivers data:', err);
        },
      });
  }

  onBookTrip(cardResultDriver: ResultDriver) {
    this.resultDriver = cardResultDriver;
    this.changeStep.emit(this.resultDriver);
  }

  searchDrivers() {
    this.driverService.getAllDrivers().subscribe((response: ResultDriver[]) => {
      if (this.results.length > 0) {
        this.results = response.filter((resultDriver: ResultDriver) => {
          return resultDriver.name
            .toLowerCase()
            .includes(this.nameOrSensorCode.toLowerCase());
        });
        console.log('Resultados:', this.results);
      }
    });

    // TODO: Replace for this
    // this.driverService
    //   .getDriverByNameOrSensorCode(this.nameOrSensorCode)
    //   .subscribe((drivers: User[] | null) => {
    //     if (drivers) {
    //       this.results = drivers.map((driver: User) =>
    //         this.mapUserToResultDriver(driver)
    //       );
    //     } else {
    //       this.results = [];
    //     }
    //   });
  }
}
