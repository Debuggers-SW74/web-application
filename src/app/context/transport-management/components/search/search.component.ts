import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ResultCardComponent } from '../result-card/result-card.component';
import { CommonModule } from '@angular/common';
import { ResultDriver } from '../../models/ResultDriver';
import { UserService } from '@app/shared/services/user/user/user.service';
import { User } from '@app/shared/models/entities/User';
import { AuthService } from '@app/shared/services/auth/auth.service';

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
  providers: [UserService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Output() changeStep = new EventEmitter<ResultDriver>();

  nameOrSensorCode: string = '';
  resultDriver: ResultDriver | null = null;

  results: ResultDriver[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.setEndpoint('drivers');

    const userId = this.authService.getUserIdFromToken();

    this.userService
      .getDriversBySupervisorId(userId as number)
      .subscribe((drivers: ResultDriver[]) => {
        if (drivers) {
          this.results = drivers;
        }
      });
  }

  onBookTrip(cardResultDriver: ResultDriver) {
    this.resultDriver = cardResultDriver;
    this.changeStep.emit(this.resultDriver);
  }

  searchDrivers() {
    this.userService.setEndpoint('drivers');

    this.userService.getAllDrivers().subscribe((response: ResultDriver[]) => {
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
    // this.userService
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
