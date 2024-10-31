import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BookTripComponent } from '../../components/book-trip/book-trip.component';
import { SearchComponent } from '@app/context/transport-management/components/search/search.component';
import { DriverSteps } from '@shared/models/enum/driver-steps';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [SearchComponent, BookTripComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
})
export class DriversComponent implements OnInit {
  steps = [DriverSteps.SearchDriver, DriverSteps.BookTrip];
  currentStepView: any =
    this.steps[1] === DriverSteps.SearchDriver
      ? SearchComponent
      : BookTripComponent;
  stepTitle = 'Search Drivers';

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  constructor() {}

  ngOnInit(): void {
    this.loadComponent(this.currentStepView);
  }

  changeStep(step: DriverSteps) {
    if (step === DriverSteps.SearchDriver) {
      this.currentStepView = SearchComponent;
      this.stepTitle = 'Search Drivers';
    } else if (step === DriverSteps.BookTrip) {
      this.currentStepView = BookTripComponent;
      this.stepTitle = 'Book a Trip';
    }

    this.loadComponent(this.currentStepView);
  }

  loadComponent(component: any) {
    this.container.clear();
    const componentRef = this.container.createComponent(component);

    if (component === SearchComponent) {
      const instance = componentRef.instance as SearchComponent;
      instance.changeStep.subscribe(() =>
        this.changeStep(DriverSteps.BookTrip),
      );
    }
  }
}
