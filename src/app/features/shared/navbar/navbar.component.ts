import { Component } from '@angular/core';
import { CartIconComponent } from '../../cart/cart-icon/cart-icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CartIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {

}
