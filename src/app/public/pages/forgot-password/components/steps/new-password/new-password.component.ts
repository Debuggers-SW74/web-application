import { Component } from '@angular/core';
import { TitleComponent } from '@app/shared/components/auth/title/title.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    TitleComponent,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  newPasswordForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: [''],
      confirmPassword: [''],
    });
  }

  createNewPassword() {
    this.router.navigate(['/sign-in']);
  }
}
