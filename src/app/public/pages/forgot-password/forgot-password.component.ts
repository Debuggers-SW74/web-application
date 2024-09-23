import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ForgotPasswordSteps } from '@app/shared/models/forgot-password-steps';
import { SendEmailComponent } from './components/steps/send-email/send-email.component';
import { NewPasswordComponent } from './components/steps/new-password/new-password.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  steps = [
    ForgotPasswordSteps.SendEmail,
    ForgotPasswordSteps.NewPassword,
  ];

  currentStep = this.steps[0];
  currentStepView: any = SendEmailComponent;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static:true})
  container!: ViewContainerRef;

  constructor() { }

  changeStep(step: ForgotPasswordSteps) {
    console.log(step);
    this.currentStep = step;
    if (step === ForgotPasswordSteps.SendEmail) {
      this.currentStepView = SendEmailComponent;
    }
    if (step === ForgotPasswordSteps.NewPassword) {
      this.currentStepView = NewPasswordComponent;
    }
    this.loadComponent(this.currentStepView);
  }

  loadComponent(component: any) {
    this.container.clear();
    const componentRef = this.container.createComponent(component);

    if (componentRef.instance instanceof SendEmailComponent) {
      componentRef.instance.onSubmit = () => this.changeStep(this.steps[1]);
    }
  }

  ngOnInit(): void {
    this.loadComponent(this.currentStepView);
  }
}
