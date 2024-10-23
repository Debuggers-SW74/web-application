import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/components/app/header/header.component';
import { FooterComponent } from '@shared/components/app/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, MatSidenavModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent { }
