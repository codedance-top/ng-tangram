import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NtUploadControlError } from '@ng-tangram/components/upload';
// import { NtFile } from '@ng-tangram/components/file';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'demo-file-basic',
  template: `
    <nt-form-field label="文件列表">
      <nt-file url="/files/logos" maxFiles="5" name="file"
        (error)="onError($event)" [formControl]="fileControl">
        <nt-ant-icon type="upload"></nt-ant-icon>&nbsp;Select File
      </nt-file>
      <button class="button">文件列表</button>
    </nt-form-field>
    <br>
    {{ fileControl.value | json }}
  `
})
export class DemoFileBasciComponent {

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

  files = [
    { id: "nt-file-032132121", name: "microMsg.1430457292873的副本.jpg", },
    { id: "nt-file-1", name: "microMsg.1430457292873的副本.jpg", }
  ];

  constructor() { }

  onError(error: NtUploadControlError) {
    console.log(error);
  }
}
