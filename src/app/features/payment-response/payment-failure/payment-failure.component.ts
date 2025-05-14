import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  imports: [],
  templateUrl: './payment-failure.component.html',
  styleUrl: './payment-failure.component.sass'
})
export class PaymentFailureComponent implements OnInit{
paymentId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'] || params['collection_id'] || null;
      this.errorMessage = params['error'] || null;
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
  }
}
