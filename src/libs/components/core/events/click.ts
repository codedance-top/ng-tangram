import { fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

// export function getParentElement(element: HTMLElement) {
//   return element.offsetParent as HTMLElement;
// }

// export function getOffsetLeftOfBody(element: HTMLElement) {
//   let offsetLeft = 0;
//   while (element && element !== document.body) {
//     offsetLeft += element.offsetLeft;
//     element = getParentElement(element);
//   }
//   return offsetLeft;
// }

// export function getOffsetTopOfBody(element: HTMLElement) {
//   let offsetTop = 0;
//   while (element && element !== document.body) {
//     offsetTop += element.offsetTop;
//     element = getParentElement(element);
//   }
//   return offsetTop;
// }


/**
 * 订阅来自区域外的点击
 * @param zones 可点击的区域（忽略在这些区域发生的点击事件）
 * @param container 监听的容器，默认是 document.body
 */
export function fromOutsideClick(zones: HTMLElement[], container: Element = document.body): Observable<Event> {

  // 判断目标元素或所有父级节点是否匹配条件
  const isMatchElement = (target: Element, parent: Element) => {
    let matched = target === parent;
    while (!matched
      && target.parentElement
      && target.parentElement !== container) {
      matched = parent === (target = target.parentElement);
    }
    return matched;
  };

  // 判断点击事件的坐标点是否处于目标元素的范围内
  // const isClickZone = (event: MouseEvent, zone: HTMLElement) => {

  //   return zone.isEqualNode(event.target as Element);

  //   const clickX = event.clientX + window.pageXOffset,
  //     clickY = event.clientY + window.pageYOffset,
  //     x1 = getOffsetLeftOfBody(zone),
  //     y1 = getOffsetTopOfBody(zone),
  //     x2 = x1 + zone.offsetWidth,
  //     y2 = y1 + zone.offsetHeight;

  //     console.log(x1, y1);
  //     console.log(x2, y2);
  //     console.log(clickX, clickY);

  //   return clickX >= x1 && clickX <= x2 && clickY >= y1 && clickY <= y2;
  // };


  // 为防止事件冒泡引起的订阅延迟，这里的事件监听在捕获阶段就执行
  // * 当监听这个事件的行为是通过其他元素的 click 事件发生并且继续让事件冒泡的情况下，事件马上会被处理从而导致跟预期不同的现象发生。
  return fromEvent(container, 'click', { capture: true }).pipe(
    filter((event: MouseEvent) => !zones.some(element => isMatchElement(event.target as Element, element))),
    // tap(e => console.log(e))
  );
}
