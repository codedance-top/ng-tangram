import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-basic',
  template: `
    <a class="button" nt-popover="Title">
      Click me
      <nt-popover-pane>Content</nt-popover-pane>
    </a>
  `
})
export class ExamplePopoverBasciComponent {

}
