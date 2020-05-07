import { Component } from '@angular/core';

@Component({
  selector: 'demo-avatar-size',
  template: `
    <nt-avatar size="small" [src]="src" ></nt-avatar>
    <nt-avatar size="medium" [src]="src" ></nt-avatar>
    <nt-avatar size="large" [src]="src" ></nt-avatar>
    <nt-avatar style="width: 150px; height: 150px" [src]="src" ></nt-avatar>

  `
})
export class DemoAvatarSizeComponent {
  src = '/assets/avatar.jpg';
}
