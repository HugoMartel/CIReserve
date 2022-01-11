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
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountComponent,
    FooterComponent,
    MapComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
