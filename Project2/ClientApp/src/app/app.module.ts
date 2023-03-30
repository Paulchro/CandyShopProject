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
import {MatCard, MatCardModule} from '@angular/material/card';
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
import { TableAdminComponent } from './table-admin/table-admin.component';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesComponent } from './employees/employees.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';
import { FormComponent } from './form/form.component';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { GridTableBootstrapComponent } from './grid-table-bootstrap/grid-table-bootstrap.component';
import { OtherComponent } from './other/other.component';
// import { AuthGuard } from './guards/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { AuthGuardService } from './services/auth-guard.service';
import { StartComponent } from './start/start.component';




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
    AddProductFormComponent,
    TableAdminComponent,
    EditProductFormComponent,
    SidebarComponent,
    EmployeesComponent,
    AddEmployeeFormComponent,
    FormComponent,
    GridTableBootstrapComponent,
    OtherComponent,
    SignInComponent,
    LogOutComponent,
    StartComponent
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
    MatSnackBarModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    RouterModule.forRoot([
      { path: 'start', component: StartComponent},
      { path: 'signin', component: SignInComponent},
      { path: 'home', component: HomeComponent},
      { path: 'sweets', component: MainComponent },
      { path: 'allsweets', component: AdminAllproductsComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
      { path: 'admin', component: AdminAllproductsComponent, canActivate: [AuthGuardService] },
      { path: 'employees', component: EmployeesComponent},
      { path: 'other', component: OtherComponent,canActivate: [AuthGuardService]},
      { path: 'logout', component: LogOutComponent},
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
