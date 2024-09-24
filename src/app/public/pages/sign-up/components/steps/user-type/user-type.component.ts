import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-type',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-type.component.html',
  styleUrl: './user-type.component.css',
})
export class UserTypeComponent {
  @Input() onSubmit!: () => void;

  submit() {
    console.log('User Type Submitted');
    this.onSubmit();
  }
}
