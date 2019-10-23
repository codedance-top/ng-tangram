import { AfterContentInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'example-picture-basic',
  template: `
  <nt-radio-group [(ngModel)]="status">
    <nt-radio value="normal">normal</nt-radio>
    <nt-radio value="readonly">readonly</nt-radio>
    <nt-radio value="disabled">disabled</nt-radio>
  </nt-radio-group>
  <nt-form-field label="图片" [messages]="{ required: '请上传图片' }">
    <nt-picture url="/files/logos" maxFiles="5" name="picture" [formControl]="pictureControl"
      disabled="{{status === 'disabled'}}" readonly="{{status === 'readonly'}}">
      <i class="fa fa-upload"></i>
    </nt-picture>
  </nt-form-field>
  `
})
export class ExamplePictureBasciComponent implements AfterContentInit {

  pictureControl = new FormControl([
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

  status: string = 'normal';

  constructor() { }

  ngAfterContentInit() { }
}
