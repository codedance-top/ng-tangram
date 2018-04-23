import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    ServerModule,
    // ModuleMapLoaderModule
  ]
})
export class AppServerModule { }
