import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTripCardComponent } from './resume-trip-card.component';

describe('ResumeTripCardComponent', () => {
  let component: ResumeTripCardComponent;
  let fixture: ComponentFixture<ResumeTripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTripCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
