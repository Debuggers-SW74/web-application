import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libAutoTab]',
  standalone: true
})
export class AutoTabDirective {
  @Input() libAutoTab!: string;

  constructor() {}

  @HostListener('input', ['$event.target']) onInput(input: HTMLInputElement) {
    const length = input.value.length;
    const maxLength = input.maxLength;

    if (length >= maxLength && this.libAutoTab) {
      const field = document.getElementById(this.libAutoTab);
      if (field) {
        field.focus();
      }
    }
  }
}
