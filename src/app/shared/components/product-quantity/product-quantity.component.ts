import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { SCartServiceService } from 'shared/services/s-cart-service.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private sCartService: SCartServiceService) { }

  addToCart() {
    this.sCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.sCartService.removeFromCart(this.product);
  }

}
