import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NtUploadControlError, NtFileSizeError } from '@ng-tangram/components/upload';
import { Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'example-file-event',
  template: `
    <nt-form-field label="图片" [messages]="{ required: '请上传图片' }">
      <nt-picture url="/files/logos" maxFiles="2" maxSize="0.5" name="picture" [formControl]="pictureControl"
        disabled="{{status === 'disabled'}}" readonly="{{status === 'readonly'}}" (error)="onError($event)">
        <i class="fa fa-upload"></i>
      </nt-picture>
    </nt-form-field>
  `
})
export class ExampleFileEventComponent {

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
