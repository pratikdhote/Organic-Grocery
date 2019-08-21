import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SCartServiceService } from 'shared/services/s-cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: SCartServiceService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrderByUsers(userId: string){
    return this.db.list('/orders', {
      query : {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  getItemsByUserId(orderId: string) {
    return this.db.object('/orders/' + orderId + '/items');
  }
}
