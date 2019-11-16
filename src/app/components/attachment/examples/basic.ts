import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'example-attachment-basic',
  template: `
    <nt-radio-group [(ngModel)]="status">
      <nt-radio value="normal">正常</nt-radio>
      <nt-radio value="disabled">禁用</nt-radio>
    </nt-radio-group>
    <nt-form-field label="文件列表" [messages]="{ required: '请上传文件' }">
      <nt-attachment url="/files/logos" name="file" [formControl]="fileControl"
        disabled="{{status === 'disabled'}}">
        <i class="fa fa-paperclip"></i>&nbsp;Select File
      </nt-attachment>
    </nt-form-field>
  `
})
export class ExampleAttachmentBasciComponent {

  fileControl = new FormControl([
    {
      name: "microMsg.1430457292873的副本.jpg",
      link: 'https://www.baidu.com'
    },
    {
      name: "microMsg.1430457292873的副本.jpg",
      link: 'https://www.baidu.com'
    },
    {
      name: "microMsg.1430457292873的副本.jpg",
      link: 'https://www.baidu.com'
    }
  ], [Validators.required, Validators.maxLength(2)]);

  status: string = 'normal';
}
