import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'example-select-compareWith',
  template: `
    <form [formGroup]="form" ntFormAutofocus>
      <nt-form-field label="单选下拉框">
        <nt-select name="single" placeholder="单选" formControlName="single" [compareWith]="compareWith">
          <nt-option *ngFor="let option of options" [value]="option">
            {{option.name}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <nt-form-field label="多选下拉框">
        <nt-select name="multiple" placeholder="多选" formControlName="multiple" multiple [compareWith]="compareWith">
          <nt-option *ngFor="let option of options" [value]="option">
            {{option.name}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <button class="button" type="button" (click)="show()">Submit</button>
    </form>
  `
})
export class ExampleSelectCompareWithComponent implements OnInit {

  form: FormGroup;

  options: any[] = [];


  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      single: [{ id: "4", name: "Jamie", age: "19" }],
      multiple: [[{ id: "3", name: "John", age: "45" }, { id: "5", name: "Samantha", age: "32" }]]
    });
  }

  show() {
    console.log(this.form.value);
  }

  compareWith(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

  ngOnInit() {
    setTimeout(() => {
      this.options = [
        { id: "1", name: "Anna", age: "23" },
        { id: "2", name: "Dan", age: "16" },
        { id: "3", name: "John", age: "45" },
        { id: "4", name: "Jamie", age: "19" },
        { id: "5", name: "Samantha", age: "32" }
      ];
    }, 2000);
  }
}
