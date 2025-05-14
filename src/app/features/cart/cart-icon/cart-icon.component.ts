import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  imports: [],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.sass'
})
export class CartIconComponent implements OnInit{
  itemCount: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ){}

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.itemCount = count;
    });
  }

  navigateToCart(){
    this.router.navigate(['/cart']);
  }
}
