import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NtUploadControlError, NtFileSizeError } from '@ng-tangram/components/upload';
import { Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'example-picture-accept',
  template: `
    <nt-form-field label="图片" [messages]="{ required: '请上传图片' }">
      <nt-picture  url="/files/logos"
      maxFiles="5" name="file" [formControl]="pictureControl" accept="image/jpeg, image/gif" (error)="onError($event)">
        <i class="fa fa-upload"></i>&nbsp;Select File
      </nt-picture >
    </nt-form-field>
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

  /**
   * 错误提示
  */
  onError(error: NtUploadControlError) {
    if (error instanceof NtFileSizeError) {
      alert(`图片不能超过${error.maxSizeString}`);
    }
  }
}
