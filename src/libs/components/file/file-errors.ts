export declare type NtFileError = NtFileAcceptError | NtFileSizeError | NtFileUploadError;

export class NtFileAcceptError {
  constructor(
    public file: File,
    public fileAccept: string,
    public allowAccepts?: string[]) { }
}

export class NtFileSizeError {
  constructor(
    public file: File,
    public maxSize: number,
    public maxSizeString?: string) { }
}

export class NtFileUploadError {
  constructor(
    public status: number,
    public statusText: string) { }
}
