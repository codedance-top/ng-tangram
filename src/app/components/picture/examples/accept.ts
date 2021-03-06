import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NtFileError, NtFileSizeError, NtFileTypeError } from '@ng-tangram/components/core';

@Component({
  selector: 'example-picture-accept',
  styles: [`
      span {
        color: #f5212d;
      }
    `
  ],
  template: `
    <nt-form-field label="图片" [messages]="{ required: '请上传图片' }">
      <nt-picture  url="/files/logos"
        name="file" [formControl]="pictureControl" accept="image/jpeg, image/gif" (error)="onError($event)">
        <i class="fa fa-upload"></i>&nbsp;Select File
      </nt-picture >
    </nt-form-field>
    <span>{{message}}</span>
  `
})
export class ExamplePictureAcceptComponent {

  pictureControl = new FormControl([
    {
      id: '1',
      name: '',
      status: 4,
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.svg'
    }
  ], [Validators.required]);

  message = '';

  /**
   * 错误提示
  */
  onError(error: NtFileError) {
    if (error instanceof NtFileSizeError) {
      this.message = `图片不能超过${error.limitSizeString}`;
    }
    if (error instanceof NtFileTypeError) {
      this.message = `不支持图片类型${error.type}`;
    }
    // if (error instanceof NtPictureUploadError) {
    //   this.message = `${error.statusText}`;
    // }
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
