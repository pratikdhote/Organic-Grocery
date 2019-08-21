import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { SCartServiceService } from 'shared/services/s-cart-service.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions:boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private sCartService: SCartServiceService) { }

  addToCart() {
    this.sCartService.addToCart(this.product);
  }
}
