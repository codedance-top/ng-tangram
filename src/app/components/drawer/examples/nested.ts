import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer-nested',
  template: `
    <button nt-button (click)="drawer.open()">打开</button>
    <div class="drawer-container padding-1" nt-drawer-container>
      drawer 容器
      <nt-drawer #drawer class="padding-1">
        特定容器下的 drawer 弹出层
      </nt-drawer>
    </div>
  `,
  styles: [`
    .drawer-container {
      width: 100%;
      height: 300px;
      border: 1px solid #ddd;
    }
  `]
})
export class ExampleDrawerNestedComponent { }
