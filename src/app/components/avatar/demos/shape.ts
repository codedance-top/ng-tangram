import { Component } from '@angular/core';

@Component({
  selector: 'demo-avatar-shape',
  template: `
    <nt-avatar shape="square" src="/assets/avatar.jpg" ></nt-avatar>

    <nt-avatar shape="circle" src="/assets/avatar.jpg" ></nt-avatar>
  `
})
export class DemoAvatarShapeComponent { }
