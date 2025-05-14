import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../../product/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      this.cartItems.next(cart);
      this.updateCartCount();
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: Product, quantity: number): void {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItems.next(currentItems);
    this.updateCartCount();
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter(
      (item) => item.product.id !== productId
    );
    this.cartItems.next(currentItems);
    this.updateCartCount();
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.updateCartCount();
    localStorage.removeItem('cart');
  }

  private updateCartCount(): void {
    const uniqueItemsCount = this.cartItems.value.length;
    this.cartItemCount.next(uniqueItemsCount);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  updateItemQuantity(productId: number, newQuantity: number): void {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(
      (item) => item.product.id === productId
    );

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity = newQuantity;
      this.cartItems.next(currentItems);
      this.updateCartCount();
      this.saveCartToLocalStorage();
    }
  }
}
