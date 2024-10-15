import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BookTripComponent } from '../../components/book-trip/book-trip.component';
import { DriverSteps } from '@shared/models/enum/driver-steps';
import {SearchComponent} from "@app/context/transport-management/components/search/search.component";

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [BookTripComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
})
export class DriversComponent implements OnInit {
  steps = [DriverSteps.SearchDriver, DriverSteps.BookTrip];

  currentStep = this.steps[0];
  currentStepView: any = SearchComponent;
  stepTitle = 'Search Drivers';

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  constructor() {}

  changeStep(step: DriverSteps) {
    console.log(step);
    this.currentStep = step;
    if (step === DriverSteps.SearchDriver) {
      this.currentStepView = BookTripComponent;
      this.stepTitle = 'Search Drivers';
    }
    if (step === DriverSteps.BookTrip) {
      this.currentStepView = BookTripComponent;
      this.stepTitle = 'Book a trip';
    }
    this.loadComponent(this.currentStepView);
  }

  loadComponent(component: any) {
    this.container.clear();
    const componentRef = this.container.createComponent(component);
  }

  ngOnInit(): void {
    this.loadComponent(this.currentStepView);
    this.changeStep(this.steps[0]);
  }
}
