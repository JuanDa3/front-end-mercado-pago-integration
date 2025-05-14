import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MercadoPagoService } from '../../../services/mercadopago.service';
import { CommonModule } from '@angular/common';
import { PreferenceRequest } from '../../../models/mercadopago.model';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.sass']
})
export class AppCartComponent implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  modalVisible = false;
  @ViewChild('walletContainer') walletContainer!: ElementRef;
  preferenceId: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private mercadoPagoService: MercadoPagoService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  ngAfterViewInit() {
    if (this.modalVisible && this.preferenceId) {
      this.renderPaymentButton();
    }
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
      }
    });
  }

  updateQuantity(item: CartItem, change: number) {
    // Lógica para actualizar la cantidad
  }

  removeItem(productId: number) {
    // Lógica para eliminar un item
  }

  clearCart() {
    // Lógica para vaciar el carrito
  }

  proceedToCheckout(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Formatear los items del carrito para el formato esperado por MP
    const preferenceData: PreferenceRequest =
      this.mercadoPagoService.formatCartItemsForPreference(this.cartItems);

    this.mercadoPagoService.createPreference(preferenceData)
      .subscribe({
        next: (response) => {
          // Guardar el ID de preferencia y mostrar el botón de pago
          this.preferenceId = response.data.id;
          this.modalVisible = true;
          this.isLoading = false;

          setTimeout(() => {
            this.renderPaymentButton();
          }, 0);
        },
        error: (error) => {
          console.error('Error al crear la preferencia:', error);
          this.errorMessage = 'Error al conectar con el servicio de pagos. Por favor intenta más tarde.';
          this.isLoading = false;
        }
      });
  }

  renderPaymentButton(): void {
    if (!this.preferenceId || !this.walletContainer) return;

    // Obtener el elemento del DOM donde se renderizará el botón
    const container = this.walletContainer.nativeElement;
    if (!container) return;

    try {
      // Accedemos al objeto MercadoPago cargado por el script en index.html
      const mp = new (window as any).MercadoPago(
        'APP_USR-7ae5dd92-e61c-4e79-a68b-ad93ee2c5f14',
        { locale: 'es-CO' }
      );

      // Limpiar el contenedor antes de renderizar
      container.innerHTML = '';

      // Crear el botón de pago
      mp.bricks().create("wallet", "wallet_container", {
        initialization: {
          preferenceId: this.preferenceId
        },
        customization: {
          texts: {
            action: 'Pagar',
            valueProp: 'smart_option'
          }
        },
        callbacks: {
          onReady: () => {
            console.log('Brick de pago listo');
          },
          onSubmit: () => {
            console.log('Usuario hizo clic en el botón de pago');
          },
          onError: (error: any) => {
            console.error('Error durante el proceso de pago:', error);
            this.errorMessage = 'Ocurrió un error al procesar el pago. Por favor intenta de nuevo.';
          }
        }
      });
    } catch (error) {
      console.error('Error al renderizar el botón de pago:', error);
      this.errorMessage = 'No se pudo cargar el procesador de pagos. Por favor recarga la página.';
    }
  }
}
