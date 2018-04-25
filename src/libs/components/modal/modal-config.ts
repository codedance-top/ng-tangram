import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

export class NtModalConfig<T = any> {
  id?: string;
  // width?: string = '400px';
  // height?: string = '600px';
  top?: string = '80px';
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string;
  title?: string;
  closable?: boolean = true;
  position?: '';
  data?: any = {};
  panelClass?: string = 'tm-file-preview-modal-panel';
  hasBackdrop?: boolean = true;
  backdropClass?: string = 'dark-backdrop';
  centerVertically?: boolean = false;
}
