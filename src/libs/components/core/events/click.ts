import { fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


/**
 * 订阅来自区域外的点击
 * @param zones 可点击的区域（忽略在这些区域发生的点击事件）
 * @param container 监听的容器，默认是 document.body
 */
export function fromOutsideClick(zones: HTMLElement[], container: Element = document.body): Observable<Event> {

  // 判断点击事件的坐标点是否处于目标元素的范围内
  const isClickZone = (event: MouseEvent, zone: HTMLElement) => {
    const clickX = event.clientX,
      clickY = event.clientY,
      x1 = zone.offsetLeft,
      y1 = zone.offsetTop,
      x2 = x1 + zone.offsetWidth,
      y2 = y1 + zone.offsetHeight;

    return clickX >= x1 && clickX <= x2 && clickY >= y1 && clickY <= y2;
  };


  // 为防止事件冒泡引起的订阅延迟，这里的事件监听在捕获阶段就执行
  // * 当监听这个事件的行为是通过其他元素的 click 事件发生并且继续让事件冒泡的情况下，事件马上会被处理从而导致跟预期不同的现象发生。
  return fromEvent(container, 'click', { capture: true }).pipe(
    filter((event: MouseEvent) => !zones.some(element => isClickZone(event, element)))
  );
}
