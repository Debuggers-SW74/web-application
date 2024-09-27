import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleTripComponent } from './idle-trip.component';

describe('IdleTripComponent', () => {
  let component: IdleTripComponent;
  let fixture: ComponentFixture<IdleTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdleTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdleTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
