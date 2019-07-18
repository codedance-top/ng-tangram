import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppModule, BrowserAnimationsModule, BrowserTransferStateModule]
})
export class AppBrowserModule { }
