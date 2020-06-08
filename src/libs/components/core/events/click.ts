import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';

/**
 * 订阅来自元素外的点击
 * @param children 可点击的区域（忽略在这些区域发生的点击事件）
 * @param container 监听的容器，默认是 document.body
 */
export function fromOutsideElementClick(children: HTMLElement[], container: Element = document.body): Observable<Event> {

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

  return fromEvent(container, 'click').pipe(
    filter((event: MouseEvent) => !children.some(element => isMatchElement(event.target as Element, element)))
  );
}

/**
 * 订阅来自元素外的触碰
 * @param children 可触碰的区域（忽略在这些区域发生的触碰事件）
 * @param container 监听的容器，默认是 document.body
 */
export function fromOutsideElementTouch(children: HTMLElement[], container: Element = document.body): Observable<Event> {

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

  return merge(
    fromEvent(container, 'touchstart').pipe(tap(e => e.preventDefault())),
    fromEvent(container, 'mousedown')
  ).pipe(
    filter((event: MouseEvent | TouchEvent) => !children.some(element => isMatchElement(event.target as Element, element)))
  );
}


/**
 * 订阅来自区域外的点击
 * @param zones 可点击的区域（忽略在这些区域发生的点击事件）
 * @param container 监听的容器，默认是 document.body
 */
export function fromOutsideClick(zones: HTMLElement[], container: Element = document.body): Observable<Event> {

  // 判断点击事件的坐标点是否处于目标元素的范围内
  const isClickZone = (event: MouseEvent, zone: HTMLElement) => {

    const rect = zone.getBoundingClientRect();
    const clickX = event.clientX,
      clickY = event.clientY,
      x1 = rect.left,
      y1 = rect.top,
      x2 = rect.right,
      y2 = rect.bottom;

    return clickX >= x1 && clickX <= x2 && clickY >= y1 && clickY <= y2;
  };

  return fromEvent(container, 'click').pipe(
    filter((event: MouseEvent) => !zones.some(element => isClickZone(event, element)))
  );
}

/**
 * 订阅来自区域外的触碰
 * @param zones 可触碰的区域（忽略在这些区域发生的触碰事件）
 * @param container 监听的容器，默认是 document.body
 */
export function fromOutsideTouch(zones: HTMLElement[], container: Element = document.body): Observable<Event> {

  // 判断点击事件的坐标点是否处于目标元素的范围内
  const isTouchZone = (event: MouseEvent | TouchEvent, zone: HTMLElement) => {

    const rect = zone.getBoundingClientRect();
    let touchX: number, touchY: number, 
      x1 = rect.left,
      y1 = rect.top,
      x2 = rect.right,
      y2 = rect.bottom;
    if(event instanceof TouchEvent) {
      touchX = event.touches.item(0)?.clientX || -1;
      touchY = event.touches.item(0)?.clientY || -1;
    } else { 
      touchX = event.clientX;
      touchY = event.clientY;
    }

    return touchX >= x1 && touchX <= x2 && touchY >= y1 && touchY <= y2;
  };

  // fromEvent(container, 'mousedown').subscribe(e => console.log())

  return merge(
    fromEvent(container, 'touchstart').pipe(tap(e => e.preventDefault())),
    fromEvent(container, 'mousedown')
  ).pipe(
    filter((event: MouseEvent | TouchEvent) => !zones.some(element => isTouchZone(event, element)))
  );
}

