import { Component } from '@angular/core';

@Component({
  selector: 'demo-scrim-basic',
  template: `
  <table nt-scrim [ntOpenScrim]="isOpen" ntScrimText="正在加载中...">
    <thead>
      <tr>
        <th width="200">Table Header</th>
        <th>Table Header</th>
        <th width="150">Table Header</th>
        <th width="150">Table Header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Content Goes Here</td>
        <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
      </tr>
      <tr>
        <td>Content Goes Here</td>
        <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
      </tr>
      <tr>
        <td>Content Goes Here</td>
        <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
      </tr>
    </tbody>
  </table>
  <nt-pagination [ntTotal]="300" [ntPageIndex]="pageIndex" [ntPageSize]="20" (ntOnPageChange)="onPageChange($event)"></nt-pagination>
  `
})
export class DemoScrimBasciComponent {
  isOpen = false;
  pageIndex = 1;

  onPageChange(index: number) {
    this.pageIndex = index;
    this.isOpen = true;
    setTimeout(_ => this.isOpen = false, 500);
  }
}
