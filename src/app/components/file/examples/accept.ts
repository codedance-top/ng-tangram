import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NtUploadControlError, NtFileSizeError } from '@ng-tangram/components/upload';
import { Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'example-file-accept',
  template: `
    <nt-form-field label="文件列表" [messages]="{ required: '请上传文件' }">
      <nt-file url="/files/logos"
      maxFiles="5" name="file" [formControl]="fileControl" accept="{{['image/png', 'text/css']}}" (error)="onError($event)">
        <i class="fa fa-upload"></i>&nbsp;Select File
      </nt-file>
    </nt-form-field>
  `
})
export class ExampleFileAcceptComponent {

  fileControl = new FormControl([
    {
      id: "nt-file-032132121",
      name: "microMsg.1430457292873的副本.jpg",
      status: 4,
      link: 'https://www.baidu.com'
    }
  ], [Validators.required]);

  /**
   * 错误提示
  */
  onError(error: NtUploadControlError) {
    if (error instanceof NtFileSizeError) {
      alert(`文件不能超过${error.maxSizeString}`);
    }
  }
}
