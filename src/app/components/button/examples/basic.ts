import { Component } from '@angular/core';

@Component({
  selector: 'example-button-basic',
  template: `
    <button nt-button>默认</button>
    <button nt-button="hollow">空心</button>
    <button nt-button="clear">清空</button>
    <button nt-button disabled>不可用</button>
  `
})
export class ExampleButtonBasicComponent { }
