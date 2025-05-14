import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { products } from '../../../../data/products.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiurl+'/products';

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{
    return of(products);
  }

}
