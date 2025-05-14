import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListProductComponent } from './features/product/list-product/list-product.component';
import { NavbarComponent } from './features/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'checkout-pro-app';
}
