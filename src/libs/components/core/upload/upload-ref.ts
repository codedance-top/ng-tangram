import { Subscription } from "rxjs";

export enum NtUploadStatus {
  BEGIN = 0,
  SENDING = 1,
  SUCCESS = 2,
  ERROR = 3,
  UPLOADED = 4
}

export abstract class NtUploadRef<T = any> {
  id?: string;
  type?: string;
  status?: NtUploadStatus;
  error?: string;
  link?: string;
  data?: T;
  progress?: number;
  subscription?: Subscription;

  constructor(
    public file: File | Blob,
    public name: string,
    public size: number
  ) { }
}
