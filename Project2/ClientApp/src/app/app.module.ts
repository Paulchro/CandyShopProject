import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchProductComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { BackComponentComponent } from './back-component/back-component.component';
import {MatIconModule} from '@angular/material/icon';
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { WildcardComponent } from './wildcard/wildcard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BackModalComponent } from './back-modal/back-modal.component';
import { FormCartComponent } from './form-cart/form-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchProductComponent,
    BackComponentComponent,
    WelcomeComponentComponent,
    WildcardComponent,
    BackModalComponent,
    FormCartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'products', component: FetchProductComponent },
      { path: '**', component: WildcardComponent },
    ]),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
