import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'example-select-coordinat',
  template: `
    <form [formGroup]="form" ntFormAutofocus>
      <nt-form-field label="选择省份">
        <nt-select name="single" placeholder="单选" formControlName="selectedProvince">
          <nt-option *ngFor="let province of provinceData" [value]="province">
            {{province}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <nt-form-field label="选择城市">
        <nt-select name="multiple" placeholder="单选" formControlName="selectedCity">
          <nt-option *ngFor="let city of cityData[selectedProvince.value]" [value]="city">
            {{city}}
          </nt-option>
        </nt-select>
      </nt-form-field>
    </form>
  `
})
export class ExampleSelectCoordinatComponent {

  form: FormGroup;

  get selectedProvince () {
    return this.form.get('selectedProvince') as FormControl;
  }


  provinceData = ['Zhejiang', 'Jiangsu'];

  cityData: { [place: string]: string[] } = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      selectedProvince: ['Zhejiang'],
      selectedCity: ['Hangzhou']
    });

    this.selectedProvince.valueChanges.subscribe((value: string) => {
      this.form.patchValue({ 'selectedCity': this.cityData[value][0]});
    });
  }
}
