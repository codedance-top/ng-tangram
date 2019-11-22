## API

### NtModal (服务)
> NtModal服务可以创建模态框，（当以服务方式创建时，默认会监听 `afterClose()` 并销毁对话框）。通过 NtModal 服务方式创建的对话框需要自行管理其生命周期。你需要使用对话框引用来手动销毁（`ModalRef.close()`）。  

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open(content: `NtModalContent<T>`, config: `NtModalConfig` = {}) |  显示模态框  | `Function` | - |

### NtModalConfig （模态框的具体设置参数）

```js
  {
    id?: string;                                          // 对应模态框的id
    top?: string = '80px';                                // 距浏览器上方的距离
    width?: number | string = '600px';                    // 宽度
    height?: number | string = 'auto';                    // 高度
    minWidth?: number | string;                           // 最小宽度
    minHeight?: number | string;                          // 最小高度
    maxWidth?: number | string = '80vw';                  // 最大宽度
    maxHeight?: number | string;                          // 最大高度
    title?: string;                                       // 标题
    closable?: boolean = true;                            // 是否显示关闭按钮
    data?: any = {};                                      // 传入数据
    panelClass?: string = 'tm-file-preview-modal-panel';  // 内容部分样式名称
    hasBackdrop?: boolean = true;                         // 是否显示背景遮层
    backdropClass?: string = 'dark-backdrop';             // 遮层样式名称
    centerVertically?: boolean = false;                   // 是否水平垂直居中显示
    transparent?: boolean = false;                        // 背景是否透明
    viewContainerRef?: ViewContainerRef;                  // 所要附加容器
  }
  ```

### NtModalRef
> NtModalRef 对象用于控制对话框以及进行内容间的通信

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| close（ reuslt: `any` ) | Modal 关闭 | `EventEmitter` | -|
| afterOpen | Modal 完全打开后的回调 | `EventEmitter` | - | 
| beforeClose | Modal 关闭前的回调 | `EventEmitter` | - |
| afterClosed | Modal 完全关闭的回调 | `EventEmitter` | - |
| backdropClick| Modal 遮罩层被点击 | `EventEmitter` | - |
| keydownEvents| Modal 打开后键盘事件监听 | `EventEmitter` | - |


