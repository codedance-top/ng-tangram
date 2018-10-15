import { Component } from '@angular/core';

@Component({
  selector: 'demo-avatar-basic',
  template: `
    <nt-avatar size="100" shape="square" src="/assets/avatar.jpg"></nt-avatar>

    <nt-avatar  class="aa" size="large" src="/assets/avatar.jpg" ></nt-avatar>

    <nt-avatar size="small" shape="square" src="/assets/avatar.jpg"></nt-avatar>
  `
})
export class DemoAvatarBasicComponent { }
