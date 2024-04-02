import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './conponent/home/home.component';
import { CartComponent } from './conponent/cart/cart.component';
import { AboutComponent } from './conponent/about/about.component';
import { ContactComponent } from './conponent/contact/contact.component';
import { ProductComponent } from './conponent/product/product.component';
import { LoginComponent } from './conponent/auth/login/login.component';
import { RegisterComponent } from './conponent/auth/register/register.component';
import { ProductDetailComponent } from './conponent/product-detail/product-detail.component';
import { ThankComponent } from './conponent/thank/thank.component';
import { AdminComponent } from './conponent/admin/admin.component';
const routes: Routes = [
  {
    path: '',redirectTo: '/home', pathMatch: 'full',
  },
  {
    path: 'home', component:HomeComponent
  },
  {
    path: 'cart',component:CartComponent
  },
  {
    path: 'about',component:AboutComponent
  },
  {
    path: 'contact',component:ContactComponent
  },
  {
    path: 'product',component:ProductComponent
  },
  {
    path: 'login',component:LoginComponent
  },
  {
    path: 'register',component:RegisterComponent
  },
  {
    path: 'thank',component:ThankComponent
  },
  {
    path: 'admin',component:AdminComponent
  },
  {
    path: 'product-detail/:id',component:ProductDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
