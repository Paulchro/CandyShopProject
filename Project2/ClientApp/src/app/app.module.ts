import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchProductComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { BackModalComponent } from './back-modal/back-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormCartComponent } from './form-cart/form-cart.component';
=======
import {MatButtonModule} from '@angular/material/button';
import { BackComponentComponent } from './back-component/back-component.component';
import {MatIconModule} from '@angular/material/icon';
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { WildcardComponent } from './wildcard/wildcard.component';
>>>>>>> 479884b28f0a3a32a7270ce16cb97c29c382ec73

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FetchProductComponent,
<<<<<<< HEAD
    BackModalComponent,
    FormCartComponent,
=======
    BackComponentComponent,
    WelcomeComponentComponent,
    WildcardComponent
>>>>>>> 479884b28f0a3a32a7270ce16cb97c29c382ec73
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
<<<<<<< HEAD
    MatDialogModule,
=======
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
>>>>>>> 479884b28f0a3a32a7270ce16cb97c29c382ec73
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'products', component: FetchProductComponent },
      { path: '**', component: WildcardComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
