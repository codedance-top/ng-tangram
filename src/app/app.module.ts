import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/zh';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
    NT_PAGINATION_CONFIG, NtButtonModule, NtFormsModule, NtNativeDateModule, NtUploadModule
} from '@ng-tangram/components';
// import { NtMomentDateModule } from '@ng-tangram/moment-adapter';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

registerLocaleData(locale);

const ROUTES: Routes = [
  { path: '', component: HomeComponent, data: { title: '基于 Angular 的桌面端组件库' } },
  { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
  { path: 'pro', loadChildren: './pro/pro.module#ProModule' },
  { path: '**', component: PageNotFoundComponent, data: { title: '404 - 找不到此页面' } }
];

const PAGINATION_CONFIG = {
  previousLabel: '上一页',
  nextLabel: '下一页'
};

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule.withServerTransition({
      appId: 'ng-tangram-docs'
    }),
    BrowserTransferStateModule,
    NtButtonModule,
    NtFormsModule.forRoot(),
    NtNativeDateModule,
    NtUploadModule.forRoot(),
    // NtMomentDateModule,
    RouterModule.forRoot(ROUTES, {
      initialNavigation: 'enabled',
      useHash: !environment.production,
      paramsInheritanceStrategy: 'always'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-CN' },
    { provide: NT_PAGINATION_CONFIG, useValue: PAGINATION_CONFIG }
  ],
  declarations: [AppComponent, PageNotFoundComponent, HomeComponent],
  exports: [AppComponent]
})
export class AppModule { }
