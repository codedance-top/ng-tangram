import { Component } from '@angular/core';

@Component({
  selector: 'demo-select-basic',
  template: `
    <form #form="ngForm" (ngSubmit)="submit(form.value)">
      <nt-select name="name" placeholder="请选择" [(ngModel)]="name">
        <nt-option *ngFor="let alphabet of alphabets" [ntValue]="alphabet">{{alphabet}}{{alphabet}}{{alphabet}}</nt-option>
      </nt-select>
      <button class="button" type="submit">Submit</button>
    </form>
  `
})
export class DemoSelectBasciComponent {

  alphabets = Array(26).fill(0).map((v, index) => String.fromCharCode(65 + index));

  name = 'B';

  constructor() {
  }

  submit(value: any) {
    console.log(value);
  }
}
