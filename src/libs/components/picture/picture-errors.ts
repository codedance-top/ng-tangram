export declare type NtPictureError = NtPictureAcceptError | NtPictureSizeError | NtPictureUploadError;

export class NtPictureAcceptError {
  constructor(
    public file: File,
    public fileAccept: string,
    public allowAccepts?: string[]) { }
}

export class NtPictureSizeError {
  constructor(
    public file: File,
    public maxSize: number,
    public maxSizeString?: string) { }
}

export class NtPictureUploadError {
  constructor(
    public status: number,
    public statusText: string) { }
}
