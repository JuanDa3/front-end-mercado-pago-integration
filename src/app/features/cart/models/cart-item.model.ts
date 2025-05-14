import { Product } from '../../product/models/product.model';

export interface CartItem{
    product: Product;
    quantity: number;
}
