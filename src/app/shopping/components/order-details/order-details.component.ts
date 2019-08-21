import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  items: ShoppingCartItem[]= [];

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    let items$ = this.orderService.getItemsByUserId(this.orderId);
    items$.subscribe(items => this.items = items);
  }

  getTotalPrice() {
    let sum = 0;
    for(let item in this.items) {
      sum += this.items[item].totalPrice;
    }
    return sum;
  }
}
