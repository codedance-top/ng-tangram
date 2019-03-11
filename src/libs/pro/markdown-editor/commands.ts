/**
 * MarkdownEditor Commands
 */

// common regexp
export const LINE_REGEXP = /^([^\n]*)(\n|$)/gm;

// text-style regexp
export const BOLD_REGEXP = /^#\s+/;
export const ITALIC_REGEXP = /^#\s+/;
export const STRIKETHROUGH_REGEXP = /^#\s+/;

// header regexp
export const H1_REGEXP = /^#\s/;
export const H1_REGEXP_MULTIPLE = /^(#\s)([^\n]*)(\n|$)/gm;

export const H2_REGEXP = /^#{2}\s/;
export const H2_REGEXP_MULTIPLE = /^(#{2}\s)([^\n]*)(\n|$)/gm;

export const H3_REGEXP = /^#{3}\s/;
export const H3_REGEXP_MULTIPLE = /^(#{3}\s)([^\n]*)(\n|$)/gm;

export const H4_REGEXP = /^#{4}\s/;
export const H4_REGEXP_MULTIPLE = /^(#{4}\s)([^\n]*)(\n|$)/gm;

export const H5_REGEXP = /^#{5}\s/;
export const H5_REGEXP_MULTIPLE = /^(#{5}\s)([^\n]*)(\n|$)/gm;

export const H6_REGEXP = /^#{6}\s/;
export const H6_REGEXP_MULTIPLE = /^(#{6}\s)([^\n]*)(\n|$)/gm;

// list regexp
export const UL_REGEXP = /^[*\-+]\s/;
export const UL_REGEXP_MULTIPLE = /^([*\-+]\s)([^\n]*)(\n|$)/gm;
export const OL_REGEXP = /^\d+\.\s+/;
export const OL_REGEXP_MULTIPLE = /^(\d+\.\s)([^\n]*)(\n|$)/gm;

// code regexp
// export const CODE_REGEXP = /^``````/;

/** 命令 */
export declare type NtMarkdownEditorCommand = (doc: CodeMirror.Doc, erase: boolean, multiple: boolean) => void;

/**
 * h1 - h6
 * @param size header 大小值 {范围：1 - 6}
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function header(size: number, doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {

  let single = new RegExp(`^#{${size}}\\s`);
  let multi = new RegExp(`^(#{${size}}\\s)([^\\n]*)(\\n|$)`, 'gm');

  let line = new RegExp(`^(#{${size}}\\s)([^\\n]*)(\\n|$)`, 'gm');

  /** 输入光标位置 */
  let start = doc.getCursor('start');
  let end = doc.getCursor('end');

  /** 原文内容和替换的内容 */
  let origin = doc.getRange({ line: start.line, ch: 0 }, end);
  let replacement = '';

  let symbol = Array(size).fill('#').join('');

  let startOffset = 0, endOffset = 0;

  if (erase) {
    replacement = origin.replace(multi, (_match, $1, $2, $3) => {
      endOffset = $1.length;
      return `${$2}${$3}`;
    });

    // 计算字符的移位数
    startOffset = doc.getLine(start.line).match(single) ? -size - 1 : 0;
    endOffset = doc.getLine(end.line).match(single) ? -endOffset : 0;

  } else {
    replacement = origin
      .replace(/^(#{1,6}\s)([^\n]*)(\n|$)/gm, (_match, _$1, $2, $3) => `${$2}${$3}`)
      .replace(LINE_REGEXP, match => !match.trim() && multiple ? match : `${symbol} ${match}`);

    // 计算字符的移位数
    startOffset = doc.getLine(start.line).match(single) ? 0 : size + 1;
    endOffset = doc.getLine(end.line).match(single) ? 0 : size + 1;
  }

  // 替换选中的文本
  doc.replaceRange(replacement, { line: start.line, ch: 0 }, end);

  // 重新选中内容, 如果是多行模式尾行的偏移独立计算
  doc.setSelection(
    { line: start.line, ch: start.ch + startOffset },
    { line: end.line, ch: end.ch + (multiple ? endOffset : startOffset) },
    { scroll: false }
  );

}

/**
 * h1
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function h1(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {
  header(1, doc, erase, multiple);
}

/**
 * h2
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function h2(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {
  header(2, doc, erase, multiple);
}

/**
 * h3
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function h3(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {
  header(3, doc, erase, multiple);
}

/**
 * h4
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function h4(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {
  header(4, doc, erase, multiple);
}

/**
 * h5
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function h5(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {
  header(5, doc, erase, multiple);
}

/**
 * h6
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function h6(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {
  header(6, doc, erase, multiple);
}

/**
 * 无序列表命令
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function ul(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {

  /** 输入光标位置 */
  let start = doc.getCursor('start');
  let end = doc.getCursor('end');

  /** 原文内容和替换的内容 */
  let origin = doc.getRange({ line: start.line, ch: 0 }, end);
  let replacement = '';

  let startOffset = 0, endOffset = 0;

  if (erase) {
    replacement = origin.replace(UL_REGEXP_MULTIPLE, (_match, $1, $2, $3) => {
      endOffset = $1.length;
      return `${$2}${$3}`;
    });

    // 计算字符的移位数
    startOffset = doc.getLine(start.line).match(UL_REGEXP) ? -2 : 0;
    endOffset = doc.getLine(end.line).match(UL_REGEXP) ? -endOffset : 0;

  } else {
    replacement = origin.replace(LINE_REGEXP, match => !match.trim() && multiple ? match : `- ${match}`);

    // 计算字符的移位数
    startOffset = doc.getLine(start.line).match(UL_REGEXP) ? 0 : 2;
    endOffset = doc.getLine(end.line).match(UL_REGEXP) ? 0 : 2;
  }

  // 替换选中的文本
  doc.replaceRange(replacement, { line: start.line, ch: 0 }, end);

  // 重新选中内容, 如果是多行模式尾行的偏移独立计算
  doc.setSelection(
    { line: start.line, ch: start.ch + startOffset },
    { line: end.line, ch: end.ch + (multiple ? endOffset : startOffset) },
    { scroll: false }
  );
}

/**
 * 有序列表命令
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function ol(doc: CodeMirror.Doc, erase: boolean, multiple: boolean = false) {

  /** 输入光标位置 */
  let start = doc.getCursor('start');
  let end = doc.getCursor('end');

  /** 原文内容和替换的内容 */
  let origin = doc.getRange({ line: start.line, ch: 0 }, end);
  let replacement = '';

  let startOffset = 0, index = 0, endOffset = 0;

  if (erase) {
    replacement = origin.replace(OL_REGEXP_MULTIPLE, (_match, $1, $2, $3) => {
      startOffset = startOffset > 0 ? startOffset : $1.length;
      endOffset = $1.length;
      return `${$2}${$3}`;
    });

    // 计算字符的移位数
    startOffset = doc.getLine(start.line).match(OL_REGEXP) ? -startOffset : 0;
    endOffset = doc.getLine(end.line).match(OL_REGEXP) ? -endOffset : 0;

  } else {
    replacement = origin.replace(LINE_REGEXP, match => !match.trim() && multiple ? match : `${++index}. ${match}`);

    // 计算字符的移位数
    startOffset = doc.getLine(start.line).match(OL_REGEXP) ? 0 : 3;
    endOffset = doc.getLine(end.line).match(OL_REGEXP) ? 0 : index.toString().length + 2;
  }

  // 替换选中的文本
  doc.replaceRange(replacement, { line: start.line, ch: 0 }, end);

  // 重新选中内容, 如果是多行模式尾行的偏移独立计算
  doc.setSelection(
    { line: start.line, ch: start.ch + startOffset },
    { line: end.line, ch: end.ch + (multiple ? endOffset : startOffset) },
    { scroll: false }
  );
}

/**
 * 链接
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function link(doc: CodeMirror.Doc, _erase: boolean, _multiple: boolean = false) {

  const start = doc.getCursor('start');
  const end = doc.getCursor('end');

  const selection = doc.getSelection() || '',
    from = { line: start.line, ch: start.ch + 1 },
    to = { line: end.line, ch: end.ch + (start.line === end.line ? 1 : 0) };
  doc.replaceRange(`[${selection}](http://)`, start, end, selection);
  doc.setSelection(from, to, { scroll: false });
}

/**
 * 图片
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function image(doc: CodeMirror.Doc, _erase: boolean, _multiple: boolean = false) {
  const start = doc.getCursor('start');
  const end = doc.getCursor('end');

  const selection = doc.getSelection(),
    from = { line: start.line, ch: start.ch + 2 },
    to = { line: end.line, ch: end.ch + (start.line === end.line ? 2 : 0) };
  doc.replaceRange(`![${selection}](http://)`, start, end, selection);
  doc.setSelection(from, to, { scroll: false });
}

/**
 * 表格
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function table(doc: CodeMirror.Doc, _erase: boolean, _multiple: boolean = false) {
  let template = `
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Text     | Text     | Text     |
`;

  const end = doc.getCursor('end');

  doc.replaceRange(template, { line: end.line + 1, ch: 0 });
}

/**
 * 加粗
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function bold(doc: CodeMirror.Doc, _erase: boolean, _multiple: boolean = false) {

  const start = doc.getCursor('start');
  const end = doc.getCursor('end');

  const selection = doc.getSelection() || '',
    from = { line: start.line, ch: start.ch + 2 },
    to = { line: end.line, ch: end.ch + (start.line === end.line ? 2 : 0) };
  doc.replaceRange(`**${selection}**`, start, end, selection);
  doc.setSelection(from, to, { scroll: false });
}

/**
 * 斜体
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function italic(doc: CodeMirror.Doc, _erase: boolean, _multiple: boolean = false) {

  const start = doc.getCursor('start');
  const end = doc.getCursor('end');

  const selection = doc.getSelection() || '',
    from = { line: start.line, ch: start.ch + 1 },
    to = { line: end.line, ch: end.ch + (start.line === end.line ? 1 : 0) };
  doc.replaceRange(`*${selection}*`, start, end, selection);
  doc.setSelection(from, to, { scroll: false });
}

/**
 * 删除线
 * @param doc CodeMirror.Doc 对象
 * @param erase 是否要抹掉
 * @param multiple 是否是多行状态
 */
function strikethrough(doc: CodeMirror.Doc, _erase: boolean, _multiple: boolean = false) {

  const start = doc.getCursor('start');
  const end = doc.getCursor('end');

  const selection = doc.getSelection() || '',
    from = { line: start.line, ch: start.ch + 2 },
    to = { line: end.line, ch: end.ch + (start.line === end.line ? 2 : 0) };
  doc.replaceRange(`~~${selection}~~`, start, end, selection);
  doc.setSelection(from, to, { scroll: false });
}



export const commands: { [key: string]: NtMarkdownEditorCommand } = {

  // 字体样式
  bold, italic, strikethrough,

  // header
  h1, h2, h3, h4, h5, h6,

  // list
  ul, ol,

  // midia
  link, image, table
};
