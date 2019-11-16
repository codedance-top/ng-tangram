import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export const DOCS_TEMPLATE = `
<div class="grid-x">
<div class="large-2 medium-3 cell nav-treebar">
  <ng-container *ngIf="hasGroup else flatten">
    <ng-container *ngFor="let group of groups">
      <div class="nav-treebar-group">
        {{ group.name }}
      </div>
      <ul class="nav nav-tree nav-stacked no-bullet">
        <li *ngFor="let item of group.categories" routerLinkActive="active">
          <a [routerLink]="['./', item.path]">
            {{item.title}}</a>
        </li>
      </ul>
    </ng-container>
  </ng-container>
  <ng-template #flatten>
    <ul class="nav nav-tree nav-stacked no-bullet">
      <li *ngFor="let item of categories" routerLinkActive="active">
        <a [routerLink]="['./', item.path]">
          {{item.title}}</a>
      </li>
    </ul>
  </ng-template>
</div>
<div class="large-10 medium-9 cell nav-content nt-markdown">
  <h1>{{ title }}</h1>
  <router-outlet></router-outlet>
</div>
</div>`
  ;

export interface DocCategory {
  path: string;
  title: string;
  group?: string;
}

export abstract class DocsComponent implements OnDestroy {

  private _destory = new Subject();

  title = '';

  categories: Array<DocCategory>;

  groups: Array<{ name: string, categories: Array<DocCategory> }>;

  hasGroup = false;

  constructor(
    @Inject(ActivatedRoute) public activatedRoute: ActivatedRoute,
    @Inject(Router) public router: Router) {

    const routes = activatedRoute.routeConfig.children || [];
    if (this.hasGroup = routes.some(route => route.data && !!route.data.group)) {
      // 当存在 group 属性时启用 group mode
      this.groups = this.groupByCategories(routes.filter(route => route.path !== ''));

    } else {
      // 扁平的菜单结构 flatten mode
      this.categories = routes
        .filter(route => route.path !== '')
        .map(route => ({ path: route.path, title: route.data.title }))
        .sort((a, b) => a.path.localeCompare(b.path));
    }

    this.router.events.pipe(
      takeUntil(this._destory),
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
    ).subscribe(route => {
      this.title = route.snapshot.data.title;
    });
  }

  ngOnDestroy() {
    this._destory.next();
    this._destory.complete();
  }

  private groupByCategories(routes: any[]) {
    let groups = {};
    routes.forEach(route => {
      let group = route.data.group;
      groups[group] = groups[group] || [];
      groups[group].push({ path: route.path, title: route.data.title });
    });
    return Object.keys(groups).map(function (group) {
      return { name: group, categories: groups[group].sort((a, b) => a.path.localeCompare(b.path)) };
    });
  }
}
