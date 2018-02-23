import { Component } from '@angular/core';

@Component({
  selector: 'demo-menu-align',
  template: `
    <ul nt-menu ntAlign="center">
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
      <li><a href="#">Four</a></li>
    </ul>
    <ul nt-menu ntAlign="right">
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
      <li><a href="#">Four</a></li>
    </ul>
  `
})
export class DemoMenuAlignComponent { }
