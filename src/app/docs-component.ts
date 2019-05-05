import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export const DOCS_TEMPLATE = `
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
  <h1>{{ title }}</h1>
  <router-outlet></router-outlet>
</div>
</div>`
  ;

export abstract class DocsComponent implements OnDestroy {

  private _destory = new Subject();

  title = '';

  categories: Array<{ path: string, title: string }>;

  constructor(
    @Inject(ActivatedRoute) public activatedRoute: ActivatedRoute,
    @Inject(Router) public router: Router) {

    this.categories = (activatedRoute.routeConfig.children || [])
      .filter(route => route.path !== '')
      .map(route => ({ path: route.path, title: route.data.title }))
      .sort((a, b) => a.path.localeCompare(b.path));

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
}
