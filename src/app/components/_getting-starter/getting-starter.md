`TangramUI` 是基于 **Angular** 和 **Foundation** 框架开发的开源组件库，以助力企业级应用为目标而生。

[![npm version](https://badge.fury.io/js/%40ng-tangram%2Fcomponents.svg)](https://www.npmjs.com/@ng-tangram/components)

## 特性

* 开箱即用，上手简单。
* 基于 `SASS` 的参数化 UI 体系
* 40+ 个常用组件和服务
* 支持按需打包，以模块为单位导入
* 支持 SSR (服务器端渲染)
* 支持主题定制

## 开始

**npm**

```bash
npm install @ng-tangram/components --save
``` 

**yarn**

```bash
yarn add @ng-tangram/components
```

**导入**

在您的 `style.scss` 上导入

```scss
@import '~@ng-tangram/components/styles';

@include ng-tangram;
```

引用一个 `NtButtonModule` 模块

```typescript
import { NgModule } from '@angular/core';
import { NtButtonModule } from '@ng-tangram/components/button';

// 如果导入多个模块时可以在全局命名空间导入
import { 
  NtAvatarModule, 
  NtDropdown, 
  NtModalModule 
} from '@ng-tangram/components';

@NgModule({
  imports: [
    NtAvatarModule, 
    NtButtonModule, 
    NtDropdown,
    NtModalModule
  ],
  ...
})
export class MyAppModule { }
```
