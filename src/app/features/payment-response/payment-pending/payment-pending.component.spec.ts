import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPendingComponent } from './payment-pending.component';

describe('PaymentPendingComponent', () => {
  let component: PaymentPendingComponent;
  let fixture: ComponentFixture<PaymentPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
