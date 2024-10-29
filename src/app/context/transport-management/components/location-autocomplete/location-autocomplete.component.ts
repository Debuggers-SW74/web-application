import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

interface Location {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-location-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationAutocompleteComponent),
      multi: true,
    },
  ],
  templateUrl: './location-autocomplete.component.html',
  styleUrl: './location-autocomplete.component.css',
})
export class LocationAutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  searchControl = new FormControl('');
  suggestions: Location[] = [];
  loading = false;
  private subscription?: Subscription;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    this.setupSearchSubscription();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  displayFn = (location: Location): string => {
    return location ? location.display_name : '';
  };

  private setupSearchSubscription() {
    this.subscription = this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.searchLocations(value);
        }
      });
  }

  async searchLocations(query: string) {
    if (!query || query.length < 3) {
      this.suggestions = [];
      return;
    }

    this.loading = true;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}&limit=5`,
      );
      const data = await response.json();
      this.suggestions = data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      this.suggestions = [];
    } finally {
      this.loading = false;
    }
  }

  onSelected(event: any) {
    const location = event.option.value;
    this.onChange(location.display_name); // Emitimos solo el nombre de la ubicación
    this.onTouched();
  }

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    if (value) {
      this.searchControl.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }
}
