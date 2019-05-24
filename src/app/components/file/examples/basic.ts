import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NtUploadControlError } from '@ng-tangram/components/upload';
import { Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'example-file-basic',
  template: `
    <nt-radio-group [(ngModel)]="status">
      <nt-radio value="normal">正常</nt-radio>
      <nt-radio value="disabled">禁用</nt-radio>
    </nt-radio-group>
    <nt-form-field label="文件列表" [messages]="{ required: '请上传文件' }">
      <nt-file url="/files/logos" maxFiles="5" name="file" [formControl]="fileControl"
        disabled="{{status === 'disabled'}}">
        <i class="fa fa-upload"></i>&nbsp;Select File
      </nt-file>
    </nt-form-field>
  `
})
export class ExampleFileBasciComponent {

  fileControl = new FormControl([
    {
      id: "nt-file-032132121",
      name: "microMsg.1430457292873的副本.jpg",
      status: 4,
      link: 'https://www.baidu.com'
    },
    {
      id: "nt-file-1",
      name: "microMsg.1430457292873的副本.jpg",
      status: 4,
      link: 'https://www.baidu.com'
    }
  ], [Validators.required]);

  status: string = 'normal';
}
