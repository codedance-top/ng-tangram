
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-pagination-document',
  templateUrl: 'pagination.component.md'
})
export class PaginationDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  moreCode = require('!!raw-loader!./examples/more');
}
