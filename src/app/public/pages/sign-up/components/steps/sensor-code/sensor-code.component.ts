import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AutoTabDirective } from '@shared/lib/auto-tab.directive';

@Component({
  selector: 'app-sensor-code',
  standalone: true,
  imports: [AutoTabDirective, MatButtonModule],
  templateUrl: './sensor-code.component.html',
  styleUrl: './sensor-code.component.css'
})
export class SensorCodeComponent {
  @Input() onSubmit!: () => void;
  submit() {
    const inputs = [];
    for (let i = 1; i <= 6; i++) {
      const inputElement = (document.getElementById(`input${i}`) as HTMLInputElement).value;
      inputs.push(inputElement);
    }
    const enteredCode = inputs.join('');
    console.log('Entered Code:', enteredCode);
    this.onSubmit();
  }
}
