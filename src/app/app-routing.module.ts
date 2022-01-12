import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { MapComponent } from './map/map.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MapComponent },
  { path: 'book', component: BookComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'products', component: ProductsComponent },
  { path: '**', redirectTo: '/home' }// or display 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
