import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConnectedComponent } from './connected/connected.component';


import { RequestService } from './services/request.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountComponent,
    FooterComponent,
    MapComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    ConnectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ RequestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
