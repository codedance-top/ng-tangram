import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  ,
  styleUrls: ['components.component.scss'],
  host: {
    'class': 'wrapper'
  }
})
export class ComponentsComponent {

  categories: Array<{ path: string, title: string }>;

  constructor(route: ActivatedRoute) {
    this.categories = (route.routeConfig.children || [])
      .filter(route => route.path !== '')
      .map(route => ({ path: route.path, title: route.data.title }))
      .sort((a, b) => a.path.localeCompare(b.path));
  }
}
