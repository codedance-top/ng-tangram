import { Component } from '@angular/core';

@Component({
  selector: 'demo-avatar-size',
  template: `
    <nt-avatar size="small" src="/assets/avatar.jpg" ></nt-avatar>

    <nt-avatar size="medium" src="/assets/avatar.jpg" ></nt-avatar>

    <nt-avatar size="large" src="/assets/avatar.jpg" ></nt-avatar>

    <nt-avatar style="width: 150px; height: 150px" src="/assets/avatar.jpg" ></nt-avatar>

  `
})
export class DemoAvatarSizeComponent { }
