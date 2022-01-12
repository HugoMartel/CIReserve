import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';

import { FormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';

import { RequestService } from '../services/request.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountComponent,
    FooterComponent,
    MapComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ RequestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
