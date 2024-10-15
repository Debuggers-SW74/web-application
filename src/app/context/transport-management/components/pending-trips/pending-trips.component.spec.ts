import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTripsComponent } from './pending-trips.component';

describe('PendingTripsComponent', () => {
  let component: PendingTripsComponent;
  let fixture: ComponentFixture<PendingTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingTripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
