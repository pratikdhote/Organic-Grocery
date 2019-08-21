import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app.user';
import { SCartServiceService } from 'shared/services/s-cart-service.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'bts-navbar',
  templateUrl: './bts-navbar.component.html',
  styleUrls: ['./bts-navbar.component.css']
})
export class BtsNavbarComponent implements OnInit{
  appUser: AppUser;
  cart$:Observable<ShoppingCart>;
  collapsed = true;

  constructor(
    private auth:AuthService, 
    private shoppingCartservice:SCartServiceService,
    private router: Router) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartservice.getCart();
  } 

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
