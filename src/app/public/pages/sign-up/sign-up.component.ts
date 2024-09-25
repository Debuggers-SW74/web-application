import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { SignUpSteps } from '@shared/models/enum/sign-up-steps';
import { TitleComponent } from '@shared/components/auth/title/title.component';
import { SensorCodeComponent } from './components/steps/sensor-code/sensor-code.component';
import { UserTypeComponent } from './components/steps/user-type/user-type.component';
import { RegisterComponent } from './components/steps/register/register.component';
import { FillInformationComponent } from './components/steps/fill-information/fill-information.component';
import {
  User,
  UserInformation,
  UserRegistration,
} from '@shared/models/entities/User';
import { Role } from '@shared/models/enum/role';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    TitleComponent,
    SensorCodeComponent,
    UserTypeComponent,
    HttpClientModule,
  ],
  providers: [UserService],
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

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: Role.Driver,
  };

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  constructor(private userService: UserService) {}

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
      componentRef.instance.onSubmitted.subscribe((userType: Role) => {
        this.user.role = userType;
        console.log(this.user);
      });
    } else if (componentRef.instance instanceof RegisterComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[3]);
      componentRef.instance.onSubmitted.subscribe(
        (userRegistration: UserRegistration) => {
          this.user.email = userRegistration.email;
          this.user.password = userRegistration.password;
          console.log(this.user);
        },
      );
    } else if (componentRef.instance instanceof FillInformationComponent) {
      componentRef.instance.onSubmitted.subscribe(
        (userInformation: UserInformation) => {
          this.user.firstName = userInformation.firstName;
          this.user.lastName = userInformation.lastName;
          this.user.phoneNumber = userInformation.phoneNumber;
          // console.log(this.user);

          this.userService.create('users', this.user).subscribe(
            (user: User) => {
              console.log(user);
            },
            (error: any) => {
              console.log(error);
            },
          );
        },
      );
    }
  }

  ngOnInit(): void {
    this.loadComponent(this.currentStepView);
  }
}
