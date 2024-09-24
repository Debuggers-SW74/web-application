import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { SignUpSteps } from '@shared/models/enum/sign-up-steps';
import { TitleComponent } from '@shared/components/auth/title/title.component';
import { SensorCodeComponent } from './components/steps/sensor-code/sensor-code.component';
import { UserTypeComponent } from './components/steps/user-type/user-type.component';
import { RegisterComponent } from './components/steps/register/register.component';
import { FillInformationComponent } from './components/steps/fill-information/fill-information.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TitleComponent, SensorCodeComponent, UserTypeComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  steps = [
    SignUpSteps.SensorCode,
    SignUpSteps.UserType,
    SignUpSteps.Register,
    SignUpSteps.FillInformation,
  ];

  currentStep = this.steps[0];
  currentStepView: any = SensorCodeComponent;
  stepTitle = 'Insert your Sensor Code';

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  constructor() {}

  changeStep(step: SignUpSteps) {
    console.log(step);
    this.currentStep = step;
    if (step === SignUpSteps.SensorCode) {
      this.currentStepView = SensorCodeComponent;
      this.stepTitle = 'Insert your Sensor Code';
    }
    if (step === SignUpSteps.UserType) {
      this.currentStepView = UserTypeComponent;
      this.stepTitle = 'Select your type of profile!';
    }
    if (step === SignUpSteps.Register) {
      this.currentStepView = RegisterComponent;
      this.stepTitle = 'Create your account!';
    }
    if (step === SignUpSteps.FillInformation) {
      this.currentStepView = FillInformationComponent;
      this.stepTitle = 'Fill your information!';
    }
    this.loadComponent(this.currentStepView);
  }

  loadComponent(component: any) {
    this.container.clear();
    const componentRef = this.container.createComponent(component);

    if (componentRef.instance instanceof SensorCodeComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[1]);
    } else if (componentRef.instance instanceof UserTypeComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[2]);
    } else if (componentRef.instance instanceof RegisterComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[3]);
    }
  }

  ngOnInit(): void {
    this.loadComponent(this.currentStepView);
  }
}
