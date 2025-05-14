import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-pending',
  imports: [],
  templateUrl: './payment-pending.component.html',
  styleUrl: './payment-pending.component.sass'
})
export class PaymentPendingComponent implements OnInit {
  paymentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'] || params['collection_id'] || null;
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

}
