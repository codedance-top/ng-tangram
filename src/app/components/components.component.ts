import { Component, OnInit } from '@angular/core';
import { COMPONENTS_ROUTES } from './components.routes';

@Component({
  selector: 'page-components',
  template: `
    <div class="grid-x">
      <div class="large-2 medium-3 cell nav-treebar">
        <ul class="nav nav-tree nav-stacked no-bullet">
          <li *ngFor="let item of categories" routerLinkActive="active">
            <a [routerLink]="['./', item.path]">
              {{item.title}}</a>
          </li>
        </ul>
      </div>
      <div class="large-10 medium-9 cell nav-content markdown">
        <router-outlet></router-outlet>
      </div>
    </div>`
})
export class ComponentsComponent implements OnInit {

  categories = COMPONENTS_ROUTES
    .filter(route => route.path !== '')
    .map(route => ({ path: route.path, title: route.data.title }))
    .sort((a, b) => a.path.localeCompare(b.path));

  constructor() {
  }

  ngOnInit() { }
}
