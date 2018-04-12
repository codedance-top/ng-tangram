import { CommonModule, registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/zh';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NT_PAGINATION_CONFIG, NtPaginationConfig } from '@ng-tangram/components/pagination';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { NtFormsModule } from '@ng-tangram/components/forms';

registerLocaleData(locale);

const ROUTES: Routes = [
  { path: '', redirectTo: 'components', pathMatch: 'full' },
  { path: 'components', loadChildren: './components/components.module#ComponentsModule', data: { title: '组件' } },
  { path: 'utils', loadChildren: './utils/utils.module#UtilsModule', data: { title: '工具' } },
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
    NtIconModule,
    BrowserModule.withServerTransition({
      appId: 'ng-tangram-demo'
    }),
    BrowserTransferStateModule,
    NtFormsModule.forRoot(),
    RouterModule.forRoot(ROUTES, {
      initialNavigation: 'enabled',
      useHash: !environment.production
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh' },
    { provide: NT_PAGINATION_CONFIG, useValue: PAGINATION_CONFIG }
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  exports: [AppComponent]
})
export class AppModule { }
