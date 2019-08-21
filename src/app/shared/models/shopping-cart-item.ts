
export class ShoppingCartItem {
  $key: string;
  title:string;
  imageUrl:string;
  price:number;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {   //this means init can be object that looks like shoppingCartItem object; init is also optional 
    Object.assign(this,init);                      //this copies all the properites from init to current(this) object
  }
 
  get totalPrice() {
    return this.price * this.quantity;
  }
}