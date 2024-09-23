import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorCodeComponent } from './sensor-code.component';

describe('SensorCodeComponent', () => {
  let component: SensorCodeComponent;
  let fixture: ComponentFixture<SensorCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
