
import { Component } from '@angular/core';

@Component({
  templateUrl: 'datepicker.component.md'
})
export class DatePickerDocumentComponent {
  api = require('!!raw-loader!src/libs/components/datepicker/README.md').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
  boundaryCode = require('!!raw-loader!./examples/boundary').default;
  startCode = require('!!raw-loader!./examples/start').default;
  filterCode = require('!!raw-loader!./examples/filter').default;
  changeCode = require('!!raw-loader!./examples/change').default;
  momentCode = require('!!raw-loader!./examples/moment').default;
  formsCode = require('!!raw-loader!./examples/forms').default;
  momentModuleCode = require('!!raw-loader!./examples/moment.module').default;
 }
