
import { Component } from '@angular/core';

@Component({
  selector: 'nt-datepicker-document',
  templateUrl: 'datepicker.component.md'
})
export class DatePickerDocumentComponent {
  api = require('!!raw-loader!src/libs/components/datepicker/README.md');
  basicCode = require('!!raw-loader!./examples/basic');
  boundaryCode = require('!!raw-loader!./examples/boundary');
  startCode = require('!!raw-loader!./examples/start');
  filterCode = require('!!raw-loader!./examples/filter');
  changeCode = require('!!raw-loader!./examples/change');
  momentCode = require('!!raw-loader!./examples/moment');
  formsCode = require('!!raw-loader!./examples/forms');
  momentModuleCode = require('!!raw-loader!./examples/moment.module');
 }
