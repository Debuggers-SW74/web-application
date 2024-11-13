import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TitleComponent } from '@shared/components/auth/title/title.component';
import {
  User,
  UserInformation,
  UserRegistration,
  Driver,
} from '@shared/models/entities/User';
import { Role } from '@shared/models/enum/role';
import { SignUpSteps } from '@shared/models/enum/sign-up-steps';
import { DriverService } from '@app/shared/services/user/driver/driver.service';
import { SupervisorService } from '@app/shared/services/user/supervisor/supervisor.service';
import { FillInformationComponent } from './components/steps/fill-information/fill-information.component';
import { RegisterComponent } from './components/steps/register/register.component';
import { SensorCodeComponent } from './components/steps/sensor-code/sensor-code.component';
import { UserTypeComponent } from './components/steps/user-type/user-type.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TitleComponent, SensorCodeComponent, UserTypeComponent],
  providers: [DriverService, SupervisorService],
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
  enteredCode = '';

  userType: Role = Role.Driver;
  user: User = {
    id: 0,
    name: '',
    firstLastName: '',
    secondLastName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
  };

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  constructor(
    private driverService: DriverService,
    private supervisorService: SupervisorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadComponent(this.currentStepView);
  }

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
      componentRef.instance.onSubmitted.subscribe((enteredCode: string) => {
        this.enteredCode = enteredCode;
      });
    } else if (componentRef.instance instanceof UserTypeComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[2]);
      componentRef.instance.onSubmitted.subscribe((userType: Role) => {
        this.userType = userType;
      });
    } else if (componentRef.instance instanceof RegisterComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[3]);
      componentRef.instance.onSubmitted.subscribe(
        (userRegistration: UserRegistration) => {
          this.user.email = userRegistration.email;
          this.user.password = userRegistration.password;
          // console.log(this.user);
        }
      );
    } else if (componentRef.instance instanceof FillInformationComponent) {
      componentRef.instance.onSubmitted.subscribe(
        (userInformation: UserInformation) => {
          this.user.name = userInformation.name;
          this.user.firstLastName = userInformation.firstLastName;
          this.user.secondLastName = userInformation.secondLastName;
          this.user.phone = userInformation.phone;

          if (this.userType === Role.Driver) {
            let driver: Driver = {
              ...this.user,
              username: this.user.name + this.user.firstLastName,
              supervisorId: parseInt(this.enteredCode[0]),
            };

            this.driverService.create(driver).subscribe({
              next: (response: Driver) => {
                console.log('Driver created:', response);
                this.router.navigate(['/sing-in']);
              },
              error: (err) => {
                if (err.status === 400) {
                  console.error('Bad Request: The data sent is invalid.', err);
                  alert('Please check your information and try again.');
                } else {
                  console.error('Error creating driver:', err);
                  alert(
                    'An unexpected error occurred. Please try again later.'
                  );
                }
              },
            });
          } else {
            this.supervisorService.create(this.user).subscribe({
              next: (response: User) => {
                console.log('Supervisor created:', response);
                this.router.navigate(['/sing-in']);
              },
              error: (err) => {
                if (err.status === 400) {
                  console.error('Bad Request: The data sent is invalid.', err);
                  alert('Please check your information and try again.');
                } else {
                  console.error('Error creating supervisor:', err);
                  alert(
                    'An unexpected error occurred. Please try again later.'
                  );
                }
              },
            });
          }
        }
      );
    }
  }
}
