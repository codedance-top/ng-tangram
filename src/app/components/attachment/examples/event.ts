import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  NtFileTypeError,
  NtFileError,
  NtFileSizeError,
} from '@ng-tangram/components/core';

@Component({
  selector: 'example-attachment-event',
  styles: [`
      span {
        color: #f5212d;
      }
    `
  ],
  template: `
    <nt-form-field label="文件列表" [messages]="{ required: '请上传文件' }">
      <nt-attachment url="/files/logos"
        maxFiles="2" maxSize="0.5" name="file" [formControl]="fileControl" (error)="onError($event)">
        <i class="fa fa-paperclip"></i>&nbsp;Select File
      </nt-attachment>
    </nt-form-field>
    <span>{{message}}</span>
  `
})
export class ExampleAttachmentEventComponent {

  fileControl = new FormControl([
    {
      name: "microMsg.1430457292873的副本.jpg",
      link: 'https://www.baidu.com'
    }
  ], [Validators.required]);

  message = '';

  /**
   * 错误提示
  */
  onError(error: NtFileError) {
    if (error instanceof NtFileSizeError) {
      this.message = `文件不能超过${error.limitSizeString}`;
    }
    if (error instanceof NtFileTypeError) {
      this.message = `不支持文件类型${error.type}`;
    }
    // if (error instanceof NtFileUploadError) {
    //   this.message = `${error.statusText}`;
    // }
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
