
export enum NtUploadStatus {
  BEGIN = 0,
  SENDING = 1,
  SUCCESS = 2,
  ERROR = 3,
  UPLOADED = 4
}

export abstract class NtUploadFile<T = any> {
  status: NtUploadStatus = NtUploadStatus.BEGIN;
  error?: string;
  data?: T;

  constructor(
    public name: string,
    public size?: number,
    public type?: string,
    public link?: string) { }
}

export interface NtUploadResult<T> {
  status: NtUploadStatus;
  error?: string;
  data?: T;
}
