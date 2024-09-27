import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent {
  @Input() onSubmit!: () => void;
  submit() {
    this.onSubmit();
  }
}
