import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  NtFileAcceptError,
  NtFileError,
  NtFileSizeError,
  NtFileUploadError
} from '@ng-tangram/components/file';

@Component({
  selector: 'example-file-accept',
  styles: [`
      span {
        color: #f5212d;
      }
    `
  ],
  template: `
    <nt-form-field label="文件列表" [messages]="{ required: '请上传文件' }">
      <nt-file url="/files/logos"
        maxFiles="5" name="file" [formControl]="fileControl" accept="{{['image/png', 'text/css']}}" (error)="onError($event)">
        <i class="fa fa-upload"></i>&nbsp;Select File
      </nt-file>
    </nt-form-field>
    <span>{{message}}</span>
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

  message = '';

  /**
   * 错误提示
  */
  onError(error: NtFileError) {
    if (error instanceof NtFileSizeError) {
      this.message = `文件不能超过${error.maxSizeString}`;
    }
    if (error instanceof NtFileAcceptError) {
      this.message = `不支持文件类型${error.fileAccept}`;
    }
    if (error instanceof NtFileUploadError) {
      this.message = `${error.statusText}`;
    }
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
