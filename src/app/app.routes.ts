import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    //title: 'Sign In',
    loadComponent: () =>
      import('./public/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
  {
    path: 'sign-up',
    //title: 'Sign Up',
    loadComponent: () =>
      import('./public/pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
