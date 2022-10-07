import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ClientTabComponent } from './product/product-tabs/client-tab.component';
import { SummaryTabComponent } from './product/product-tabs/summary-tab.component';
import { TitleTabComponent } from './product/product-tabs/title-tab.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    ProductComponent,
    ClientTabComponent,
    SummaryTabComponent,
    TitleTabComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
