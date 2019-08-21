import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SCartServiceService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      if(item.$exists()) item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: item.quantity + 1
      });
      else item$.set({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1
      });
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = item.quantity - 1;
      if(quantity === 0) item$.remove();
      else if(item.$exists()) item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity 
        });
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreate : new Date().getTime()
    });
  }

  private getItem(cartId:string, productId:string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {                             
    let cartId = localStorage.getItem('cartId');                  
    if(cartId) return cartId;
    //else
    let result = await this.create();                             ////using typeScript await and async method
    localStorage.setItem('cartId', result.key);                   //// instead of async promise.
    return result.key;
}
                // Or
  // private getOrCreateCart() {
  //   let cartId = localStorage.getItem('cartId');
  //   if(!cartId) {
  //     this.create().then(result => {
  //       localStorage.setItem('cartId', result.key);

  //       return this.getCart(result.key);
  //     });
  //   } else {
  //     return this.getCart(cartId);
  //   }
  // }
}
