export declare type NtFileError = NtFileTypeError | NtFileSizeError;

export class NtFileTypeError {
  constructor(
    public file: File,
    public type: string) { }
}

export class NtFileSizeError {
  constructor(
    public file: File,
    public limitSize: number,
    public limitSizeString?: string) { }
}
