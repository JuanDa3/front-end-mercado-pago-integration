import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import Swal from 'sweetalert2';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-list-products',
  imports: [],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.sass'
})
export class ListProductComponent implements OnInit{

  products: Product[] = [];
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void{
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product:Product): void {
    if (product) {
      this.cartService.addToCart(product, this.quantity);

      Swal.fire({
        title: '¡Producto agregado!',
        text: 'El producto ha sido agregado a tu cotización',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  getTruncatedDescription(description: string): string {
    if (description.length <= 120) {
      return description;
    }
    return description.substring(0, 120) + '...';
  }
}
