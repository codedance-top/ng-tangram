import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NtOptionSelectionChange } from '@ng-tangram/components/core';
import { Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

const OPTION_ITEMS = [ 
  '开源组件', '前端框架', '前端组件化'
]

@Component({
  selector: 'example-autocomplete-basic',
  template: `
    <input ntInput type="text" placeholder="输入您要查询的内容"
      [formControl]="keywordControl"
      [ntAutocomplete]="auto">

    <nt-autocomplete #auto="ntAutocomplete" (optionSelected)="onOptionSelected($event)">
      <nt-option *ngFor="let item of options | async" [value]="item">{{ item }}</nt-option>
    </nt-autocomplete>
  `
})
export class ExampleAutocompleteBasicComponent implements OnInit {

  keywordControl = new FormControl('');

  options = new Subject<string[]>();

  ngOnInit() { 
    this.keywordControl.valueChanges
    .pipe(
      map(keyword => this.filterOptions(keyword))
    ).subscribe(options => this.options.next(options));
  }

  onOptionSelected(event: NtOptionSelectionChange) { 
    
  }

  private filterOptions(keyword: string): string[] {
    const filterValue = this.normalizeValue(keyword);
    return OPTION_ITEMS.filter(item => this.normalizeValue(item).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
