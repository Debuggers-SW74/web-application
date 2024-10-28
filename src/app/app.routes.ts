import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/pages/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'sign-in',
        //title: 'Sign In',
        loadComponent: () =>
          import('./public/pages/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'sign-up',
        //title: 'Sign Up',
        loadComponent: () =>
          import('./public/pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'forgot-password',
        // title: 'Forgot Password',
        loadComponent: () =>
          import(
            './public/pages/forgot-password/forgot-password.component'
          ).then((m) => m.ForgotPasswordComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/pages/app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        //title: 'Home',
        loadComponent: () =>
          import('./context/alerts-system/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'drivers',
        //title: 'Dashboard',
        loadComponent: () =>
          import(
            './context/transport-management/pages/drivers/drivers.component'
          ).then((m) => m.DriversComponent),
      },
      {
        path: 'trips',
        //title: 'Trips',
        loadComponent: () =>
          import(
            './context/transport-management/pages/trips/trips.component'
          ).then((m) => m.TripsComponent),
      },
      {
        path: 'support',
        //title: 'Support',
        loadComponent: () =>
          import(
            './context/profile-management/pages/support/support.component'
          ).then((m) => m.SupportComponent),
      },
      {
        path: 'profile',
        //title: 'Profile',
        loadComponent: () =>
          import(
            './context/profile-management/pages/profile/profile.component'
          ).then((m) => m.ProfileComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
