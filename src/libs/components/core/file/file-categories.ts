
export const FILE_EXTENSIONS_MAP = {

  'rar': 'archive',
  'zip': 'archive',
  'cab': 'archive',
  'iso': 'archive',
  'jar': 'archive',
  '7z': 'archive',
  'tar': 'archive',
  'gz': 'archive',
  'bz2': 'archive',
  'z': 'archive',

  'jpg': 'image',
  'bmp': 'image',
  'eps': 'image',
  'gif': 'image',
  'mif': 'image',
  'miff': 'image',
  'png': 'image',
  'tif': 'image',
  'tiff': 'image',
  'svg': 'image',
  'wmf': 'image',
  'jpe': 'image',
  'jpeg': 'image',
  'dib': 'image',
  'ico': 'image',
  'tga': 'image',
  'cut': 'image',
  'pic': 'image',

  'wma': 'audio',
  'ra': 'audio',
  'ogg': 'audio',
  'mpc': 'audio',
  'm4a': 'audio',
  'aac': 'audio',
  'mpa': 'audio',
  'mp2': 'audio',
  'm1a': 'audio',
  'm2a': 'audio',
  'mp3': 'audio',
  'mid': 'audio',
  'midi': 'audio',
  'rmi': 'audio',
  'mka': 'audio',
  'ac3': 'audio',
  'dts': 'audio',
  'cda': 'audio',
  'au': 'audio',
  'snd': 'audio',
  'aif': 'audio',
  'aifc': 'audio',
  'aiff': 'audio',

  'mp4': 'video',
  'avi': 'video',
  'wav': 'video',
  'wmv': 'video',
  'rmvb': 'video',
  'rm': 'video',
  'flv': 'video',
  'mkv': 'video',
  'mpg': 'video',
  'mpeg': 'video',
  'mov': 'video',
  '3gp': 'video',

  'doc': 'word',
  'docx': 'word',

  'xls': 'excel',
  'xlsx': 'excel',

  'ppt': 'ppt',
  'pptx': 'ppt'
};

export const FILE_MIME_TYPES_MAP = {

  // 'application/x-abiword': '',
  // 'application/x-freearc': '',
  // 'application/vnd.amazon.ebook': '',
  // 'application/octet-stream': '',
  'application/x-bzip': 'archive',
  'application/x-bzip2': 'archive',
  // 'application/x-csh': '',
  'application/msword': 'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
  'application/vnd.ms-fontobject': 'font',
  'application/epub+zip': 'archive',
  'application/gzip': 'archive',
  'application/java-archive': 'archive',
  'application/json': 'code',
  // 'application/ld+json': '',
  // 'application/vnd.apple.installer+xml': '',
  // 'application/vnd.oasis.opendocument.presentation': '',
  // 'application/vnd.oasis.opendocument.spreadsheet': '',
  // 'application/vnd.oasis.opendocument.text': '',
  // 'application/ogg': '',
  'application/pdf': 'pdf',
  'application/php': 'code',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt',
  'application/x-rar-compressed': 'archive',
  // 'application/rtf': '',
  'application/x-sh': 'code',
  // 'application/x-shockwave-flash': '',
  'application/x-tar': 'archive',
  // 'application/vnd.visio': '',
  'application/xhtml+xml': 'code',
  'application/vnd.ms-excel': 'excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
  'application/xml': 'code',
  'application/vnd.mozilla.xul+xml': 'code',
  'application/zip': 'archive',
  'application/x-7z-compressed': 'archive',

  'text/css': 'code',
  'text/csv': 'code',
  'text/html': 'code',
  'text/calendar': 'code',
  'text/javascript': 'code',
  // 'text/plain': 'code',
  'text/xml': 'code',

  'font/otf': 'font',
  'font/ttf': 'font',
  'font/woff': 'font',
  'font/woff2': 'font',

  'image/bmp': 'image',
  'image/gif': 'image',
  'image/vnd.microsoft.icon': 'image',
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/svg+xml': 'image',
  'image/tiff': 'image',
  'image/webp': 'image',

  'video/x-msvideo': 'video',
  'video/mpeg': 'video',
  'video/ogg': 'video',
  'video/mp2t': 'video',
  'video/webm': 'video',
  'video/3gpp': 'video',
  'video/3gpp2': 'video',

  'audio/aac': 'audio',
  'audio/midi audio/x-midi': 'audio',
  'audio/mpeg': 'audio',
  'audio/ogg': 'audio',
  'audio/opus': 'audio',
  'audio/wav': 'audio',
  'audio/webm': 'audio',
  'audio/3gpp': 'audio',
  'audio/3gpp2': 'audio',
};

export const NT_FILE_CATEGORIES: { [key: string]: string } = {
  ...FILE_EXTENSIONS_MAP,
  ...FILE_MIME_TYPES_MAP
};

export function findCategoryByFile(file: File) {
  const type = file.type || file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
  return NT_FILE_CATEGORIES[type] || '';
}

export function findCategoryByExtensions(extension: string) {
  return FILE_EXTENSIONS_MAP[extension] || '';
}

export function findCategoryByMimeType(type: string) {
  return FILE_MIME_TYPES_MAP[type] || '';
}
