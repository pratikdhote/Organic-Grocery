import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
      this.itemsMap = itemsMap || {};

      for (let productId in itemsMap) {      
        let item = itemsMap[productId];          
        this.items.push(new ShoppingCartItem({
          ...item,                                //here we use spread(...) operator, this will iterate all the propts of the obj(item) add them here. 
          $key: productId
        }));
      }
       
      //-------------OR-----------------------------------

      // for (let productId in itemsMap) {       //here we iterate over itemsMap(items) where we get each productId(key) in the cart
      //   let item = itemsMap[productId];        //here we move all the properties of product in 'item'
      //   let x = new ShoppingCartItem();        //here we assign x to ShoppingCartItem module
      //   Object.assign(x,item);         //here we us Object.assign to assign all the prop of 'item' to 'x'
      //   x.$key = productId;            //here we assign $key prop to x ans set it to productId
      //   this.items.push(x);
      // }    
    }

    getQuantity(product: Product) {
      let item = this.itemsMap[product.$key];
      return item ? item.quantity : 0;
    }

    get totalPrice() {
      let sum = 0;
      for (let productId in this.items) {
        sum += this.items[productId].totalPrice;
      }
      return sum;
    }

    get totalItemsCount() {
      let count = 0;
      for (let productId in this.itemsMap) {
        count += this.itemsMap[productId].quantity;
      }
      return count;
    }
} 