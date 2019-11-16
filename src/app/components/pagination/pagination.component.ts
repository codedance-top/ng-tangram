
import { Component } from '@angular/core';

@Component({
  selector: 'nt-pagination-document',
  templateUrl: 'pagination.component.md'
})
export class PaginationDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  moreCode = require('!!raw-loader!./examples/more').default;
}
