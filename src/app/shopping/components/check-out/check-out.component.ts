import { Component, OnInit, OnDestroy } from '@angular/core';
import { SCartServiceService } from 'shared/services/s-cart-service.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: SCartServiceService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
