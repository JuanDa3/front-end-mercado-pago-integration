import { Routes } from '@angular/router';
import { AppCartComponent } from './features/cart/app-cart/app-cart.component';
import { ListProductComponent } from './features/product/list-product/list-product.component';
import { PaymentSuccessComponent } from './features/payment-response/payment-success/payment-success.component';
import { PaymentPendingComponent } from './features/payment-response/payment-pending/payment-pending.component';
import { PaymentFailureComponent } from './features/payment-response/payment-failure/payment-failure.component';

export const routes: Routes = [
  {path: '', component: ListProductComponent},
  {path: 'cart', component: AppCartComponent},
  {path: 'success', component: PaymentSuccessComponent},
  {path: 'pending', component: PaymentPendingComponent},
  {path: 'failure', component: PaymentFailureComponent}
];
