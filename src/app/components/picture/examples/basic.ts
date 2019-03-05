import { Component, AfterContentInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'example-picture-basic',
  template: `
  <nt-form-field label="图片">
    <nt-picture url="/files/logos" maxFiles="5" name="file" [formControl]="fileControl">
      <i class="fa fa-upload"></i>
    </nt-picture>
  </nt-form-field>
  `
})
export class ExamplePictureBasciComponent implements AfterContentInit {

  fileControl = new FormControl([
    {
      id: '1',
      name: '',
      status: 4,
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.svg'
    },
    {
      id: '2',
      name: '',
      status: 4,
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.svg'
    }
  ], [Validators.required]);

  files: any[] = [

  ];

  constructor() { }

  ngAfterContentInit() {
  }
}
