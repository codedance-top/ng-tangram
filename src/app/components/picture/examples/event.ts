import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  NtPictureAcceptError,
  NtPictureError,
  NtPictureSizeError,
  NtPictureUploadError
} from '@ng-tangram/components/picture';

@Component({
  selector: 'example-picture-event',
  styles: [`
      span {
        color: #f5212d;
      }
    `
  ],
  template: `
    <nt-form-field label="图片" [messages]="{ required: '请上传图片' }">
      <nt-picture url="/files/logos" maxFiles="2" maxSize="0.5" name="picture" [formControl]="pictureControl"
      (error)="onError($event)">
        <i class="fa fa-upload"></i>
      </nt-picture>
    </nt-form-field>
    <span>{{message}}</span>
  `
})
export class ExamplePictureEventComponent {

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
  onError(error: NtPictureError) {
    if (error instanceof NtPictureSizeError) {
      this.message = `图片不能超过${error.maxSizeString}`;
    }
    if (error instanceof NtPictureAcceptError) {
      this.message = `不支持图片类型${error.fileAccept}`;
    }
    if (error instanceof NtPictureUploadError) {
      this.message = `${error.statusText}`;
    }
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
