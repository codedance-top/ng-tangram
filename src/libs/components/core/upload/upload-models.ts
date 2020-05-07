export class NtUploadResponse<T> {
  constructor(public data: T) { }
}

export class NtUploadError {
  constructor(public file: File | Blob, public error: any) { }
}
