import { Component } from '@angular/core';

@Component({
  selector: 'demo-avatar-basic',
  template: `
    <nt-avatar size="100" shape="square" thumbnail="/assets/avatar.jpg" src="/assets/avatar.jpg"></nt-avatar>

    <nt-avatar style="large" thumbnail="/assets/avatar.jpg" ></nt-avatar>

    <nt-avatar style="small" shape="square" thumbnail="/assets/avatar.jpg" src="/assets/avatar.jpg"></nt-avatar>
  `
})
export class DemoAvatarBasicComponent { }
