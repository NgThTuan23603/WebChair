import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AuthService } from './conponent/auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './conponent/header/header.component';
import { FooterComponent } from './conponent/footer/footer.component';
import { HomeComponent } from './conponent/home/home.component';
import { CartComponent } from './conponent/cart/cart.component';
import { ProductComponent } from './conponent/product/product.component';
import { ContactComponent } from './conponent/contact/contact.component';
import { AboutComponent } from './conponent/about/about.component';
import { CheckoutComponent } from './conponent/checkout/checkout.component';
import { LoginComponent } from './conponent/auth/login/login.component';
import { RegisterComponent } from './conponent/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './conponent/product-detail/product-detail.component';
import { ThankComponent } from './conponent/thank/thank.component';
import { AdminComponent } from './conponent/admin/admin.component';

const router: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    title: 'Product Details',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    ContactComponent,
    AboutComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    ThankComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
