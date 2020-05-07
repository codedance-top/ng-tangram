import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'example-select-event',
  template: `
    <form [formGroup]="form" ntFormAutofocus>
      <nt-form-field label="单选下拉框">
        <nt-select name="single" placeholder="单选" formControlName="single"
        (selectionChange)="selectionChange($event)"
        (positionChange)="positionChange($event)"
        (valueChange)="valueChange($event)"
        (afterOpen)="afterOpen()"
        (afterClosed)="afterClosed()"
        (beforeOpen)="beforeOpen()"
        (beforeClosed)="beforeClosed()">
          <nt-option *ngFor="let alphabet of alphabets" [value]="alphabet">
            {{alphabet}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <button class="button" type="submit">Submit</button>
    </form>
  `
})
export class ExampleSelectEventComponent {

  form: FormGroup;
  alphabets = Array(26).fill(65).map((value, index) => String.fromCharCode(value + index));

  value = ['A'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      single: ['Z'],
    });
  }

  selectionChange(event: any) {
    console.log('selectionChange', event.value);
  }

  positionChange(event: any) {
    console.log('positionChange', event);
  }

  valueChange(event: any) {
    console.log('valueChange', event);
  }

  afterOpen() {
    console.log('afterOpen');
  }

  afterClosed() {
    console.log('afterClosed');
  }

  beforeOpen() {
    console.log('beforeOpen');
  }

  beforeClosed() {
    console.log('beforeClosed');
  }
}
