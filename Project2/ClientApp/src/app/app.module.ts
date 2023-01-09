import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { WildcardComponent } from './wildcard/wildcard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BackModalComponent } from './back-modal/back-modal.component';
import { FormCartComponent } from './form-cart/form-cart.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ItemComponent } from './item/item.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AdminAllproductsComponent } from './admin-allproducts/admin-allproducts.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CustomHttpInterceptor } from './http-interceptor';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WildcardComponent,
    BackModalComponent,
    FormCartComponent,
    CartComponent,
    MainComponent,
    BackButtonComponent,
    WelcomeComponent,
    ItemComponent,
    AdminAllproductsComponent,
    TableComponent,
    MatSpinnerOverlayComponent,
    AddProductFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'sweets', component: MainComponent },
      { path: 'allsweets', component: AdminAllproductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'admin', component: AdminAllproductsComponent },
      { path: '**', component: WildcardComponent },
    ]),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
