import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferenceRequest, PreferenceResponse } from '../models/mercadopago.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  /**
   * Crea una preferencia de pago en Mercado Pago a través del backend
   * @param preferenceData Datos de los items a incluir en la preferencia
   * @returns Observable con la respuesta que incluye el ID de preferencia
   */
  createPreference(preferenceData: PreferenceRequest): Observable<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${this.apiUrl}/api/payment`, preferenceData);
  }

  /**
   * Adapta los elementos del carrito al formato esperado por Mercado Pago
   * @param cartItems Los elementos del carrito de la aplicación
   * @returns Un objeto con el formato esperado por el API de preferencias
   */
  formatCartItemsForPreference(cartItems: any[]): PreferenceRequest {
    return {
      items: cartItems.map(item => ({
        id: item.product.id,
        title: item.product.title,
        unit_price: item.product.price || 0,
        description: item.product.description || '',
        category_id: item.product.category || '1001',
        picture_url: item.product.image || '',
        quantity: item.quantity
      }))
    };
  }
}
