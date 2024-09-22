import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAuthComponent } from '@shared/components/auth/header-auth/header-auth.component';
import { FooterAuthComponent } from '@shared/components/auth/footer-auth/footer-auth.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, HeaderAuthComponent, FooterAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
