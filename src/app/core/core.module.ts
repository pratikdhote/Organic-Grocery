import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { BtsNavbarComponent } from './components/bts-navbar/bts-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    BtsNavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    BtsNavbarComponent
  ]
})
export class CoreModule { }
