import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NtUploadControlError, NtFileSizeError, NtFileAcceptError, NtFileUploadError } from '@ng-tangram/components/upload';
import { Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'example-picture-event',
  template: `
    <nt-form-field label="图片" [messages]="{ required: '请上传图片' }">
      <nt-picture url="/files/logos" maxFiles="2" maxSize="0.5" name="picture" [formControl]="pictureControl"
      (error)="onError($event)">
        <i class="fa fa-upload"></i>
      </nt-picture>
    </nt-form-field>
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

  /**
   * 错误提示
  */
  onError(error: NtUploadControlError) {
    if (error instanceof NtFileSizeError) {
      alert(`图片不能超过${error.maxSizeString}`);
    }
    if (error instanceof NtFileAcceptError) {
      alert(`不支持图片类型${error.fileAccept}`);
    }
    if (error instanceof NtFileUploadError) {
      alert(`${error.statusText}`);
    }
  }
}
