import { Component } from '@angular/core';

const markdown = `
# 标题

这是一段 Markdown 文本

> Markdown
> Markdown

> Markdown

### 有序列表

1. 有序列表
2. 有序列表
3. 有序列表
4. 有序列表

### 无序列表

* 无序列表1
* 无序列表2
* 无序列表3
* 无序列表4
`;

@Component({
  selector: 'example-markdown',
  template: `
    <nt-markdown [data]="markdown"></nt-markdown>
  `
})
export class ExampleMarkdownBasciComponent {
  markdown = markdown;
}
