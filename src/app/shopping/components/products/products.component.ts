import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/switchMap';
import { SCartServiceService } from 'shared/services/s-cart-service.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$:Observable<ShoppingCart>;

  constructor(private productService: ProductService, 
              private route:ActivatedRoute,
              private shoppingCartService: SCartServiceService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().subscribe(products => {      //this is nested observables
      this.products = products;                               //1st gellAll() observable is called

      this.route.queryParamMap.subscribe(params => {          //then queryParams observable
        this.category = params.get('category');
        this.applyFilter();  
      });
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
