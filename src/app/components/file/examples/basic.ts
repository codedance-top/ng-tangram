import { Component, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NtUploadControlError } from '@ng-tangram/components/upload';
// import { NtFile } from '@ng-tangram/components/file';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'example-file-basic',
  template: `
    <nt-form-field label="文件列表">
      <nt-file url="/files/logos" maxFiles="5" name="file" [formControl]="fileControl">
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

  files = [
    { id: "nt-file-032132121", name: "microMsg.1430457292873的副本.jpg", },
    { id: "nt-file-1", name: "microMsg.1430457292873的副本.jpg", }
  ];
}
