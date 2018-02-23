import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  { path: '', redirectTo: 'callout', pathMatch: 'full' },
  { path: 'callout', loadChildren: './callout/callout.module#CalloutDocumentModule', data: { title: 'Callout' } },
  { path: 'button', loadChildren: './button/button.module#ButtonDocumentModule', data: { title: 'Button' } },
];
