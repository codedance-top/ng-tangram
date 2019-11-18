import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/zh';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  NT_PAGINATION_CONFIG,
  NtFormsModule,
  NtNativeDateModule,
  NtUploadModule
} from '@ng-tangram/components';
import { NtMarkedEngineModule } from '@ng-tangram/markdown';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

registerLocaleData(locale);

const ROUTES: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) },
  { path: 'components', loadChildren: () => import('./components/components.module').then(mod => mod.ComponentsModule) },
  { path: 'changelog', loadChildren: () => import('./changelog/changelog.module').then(mod => mod.ChangelogModule) },
  { path: '**', component: PageNotFoundComponent, data: { title: '404 - 找不到此页面' } }
];

const PAGINATION_CONFIG = {
  previousLabel: '上一页',
  nextLabel: '下一页'
};

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'ng-tangram-docs'
    }),
    CommonModule,
    HttpClientModule,
    NtFormsModule.forRoot(),
    NtUploadModule.forRoot(),
    NtNativeDateModule,
    NtMarkedEngineModule,
    RouterModule.forRoot(ROUTES, {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-CN' },
    { provide: NT_PAGINATION_CONFIG, useValue: PAGINATION_CONFIG }
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  exports: [AppComponent]
})
export class AppModule { }
