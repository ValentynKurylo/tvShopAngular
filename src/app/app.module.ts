import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { SingleProductComponent } from './components/single-product/single-product.component';


let routers = [
  {path: '', component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product/:id', component: SingleProductComponent},
]

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LoginComponent,
    SingleProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    ReactiveFormsModule,
  ],
  providers: [ProductService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
