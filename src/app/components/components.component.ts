
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface MenuCategory {
  path: string;
  title: string;
  group?: string;
}

interface MenuGroup {
  name: string;
  path?: string;
  categories?: MenuCategory[]
}

@Component({
  templateUrl: 'components.component.html',
  styleUrls: ['components.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'components-docs grid-x'
  }
})
export class ComponentsComponent {

  private _destory = new Subject();

  title = '';

  categories: Array<MenuCategory>;

  groups: Array<MenuGroup>;

  hasGroup = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) {

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

  private groupByCategories(routes: any[]): MenuGroup[] {
    let groups = {};
    routes.filter(route => route.data.group).forEach(route => {
      let group = route.data.group;
      groups[group] = groups[group] || [];
      groups[group].push({ path: route.path, title: route.data.title });
    });

    const flattenGroups: MenuGroup[] = Object.keys(groups).map((group) => {
      return { name: group, categories: groups[group].sort((a, b) => a.path.localeCompare(b.path)) };
    });

    return routes
      .filter(route => !route.data.group)
      .map(route => ({ name: route.data.title, path: route.path } as MenuGroup))
      .concat(flattenGroups);
  }
}
