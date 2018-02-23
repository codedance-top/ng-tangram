import { Component } from '@angular/core';

@Component({
  selector: 'demo-select-basic',
  template: `
    <form #form="ngForm" (ngSubmit)="submit(form.value)">
      <nt-select name="name" placeholder="请选择" [(ngModel)]="name">
        <nt-option ntValue="A">A</nt-option>
        <nt-option ntValue="B">B</nt-option>
        <nt-option ntValue="C">C</nt-option>
      </nt-select>
      <button class="button" type="submit">Submit</button>
    </form>
  `
})
export class DemoSelectBasciComponent {

  name = '';

  submit(value: any) {
    console.log(value);
  }
}
