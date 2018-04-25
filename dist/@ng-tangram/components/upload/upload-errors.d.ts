export declare type NtUploadControlError = NtFileAcceptError | NtFileSizeError | NtFileUploadError;
export declare class NtFileAcceptError {
    file: File;
    fileAccept: string;
    allowAccepts: string[] | undefined;
    constructor(file: File, fileAccept: string, allowAccepts?: string[] | undefined);
}
export declare class NtFileSizeError {
    file: File;
    maxSize: number;
    maxSizeString: string | undefined;
    constructor(file: File, maxSize: number, maxSizeString?: string | undefined);
}
export declare class NtFileUploadError {
    status: number;
    statusText: string;
    constructor(status: number, statusText: string);
}
