import { ConnectionPositionPair, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';

export declare type NtOverlayPosition =
  'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight' |
  'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';

/**
 * 定义并返回一个 overlay 窗体定位
 * @param originX 主体的中心x轴，窗体会相对于主体的中心点定位。
 * @param originY 主体的中心y轴，窗体会相对于主体的中心点定位。
 * @param overlayX 窗体的中心x轴。
 * @param overlayY 窗体的中心y轴。
 */
export function getConnectionPositionPair(
  originX: HorizontalConnectionPos, originY: VerticalConnectionPos,
  overlayX: HorizontalConnectionPos, overlayY: VerticalConnectionPos) {
  return { originX, originY, overlayX, overlayY } as ConnectionPositionPair;
}

/**
 * 获取定位名称拼接字符串
 * @param pair 定位类型。
 */
export function getPositionClassName(pair: ConnectionPositionPair) {
  return `${pair.originX}-${pair.originY}-${pair.overlayX}-${pair.overlayY}`;
}

export enum NtOverlayOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export function getPositionOrientation(position: string): NtOverlayOrientation {
  return Object.keys(OVERLAY_POSITIONS).indexOf(position) > 5
    ? NtOverlayOrientation.Horizontal
    : NtOverlayOrientation.Vertical;
}

export const OVERLAY_POSITIONS = {

  bottom: [
    getConnectionPositionPair('center', 'bottom', 'center', 'top'),
    getConnectionPositionPair('center', 'top', 'center', 'bottom')
  ],
  bottomLeft: [
    getConnectionPositionPair('start', 'bottom', 'start', 'top'),
    getConnectionPositionPair('start', 'top', 'start', 'bottom')
  ],
  bottomRight: [
    getConnectionPositionPair('end', 'bottom', 'end', 'top'),
    getConnectionPositionPair('end', 'top', 'end', 'bottom')
  ],

  top: [
    getConnectionPositionPair('center', 'top', 'center', 'bottom'),
    getConnectionPositionPair('center', 'bottom', 'center', 'top')
  ],
  topLeft: [
    getConnectionPositionPair('start', 'top', 'start', 'bottom'),
    getConnectionPositionPair('start', 'bottom', 'start', 'top')
  ],
  topRight: [
    getConnectionPositionPair('end', 'top', 'end', 'bottom'),
    getConnectionPositionPair('end', 'bottom', 'end', 'top')
  ],

  left: [
    getConnectionPositionPair('start', 'center', 'end', 'center'),
    getConnectionPositionPair('end', 'center', 'start', 'center')
  ],
  leftTop: [
    getConnectionPositionPair('start', 'top', 'end', 'top'),
    getConnectionPositionPair('end', 'top', 'start', 'top')
  ],
  leftBottom: [
    getConnectionPositionPair('start', 'bottom', 'end', 'bottom'),
    getConnectionPositionPair('end', 'bottom', 'start', 'bottom')
  ],

  right: [
    getConnectionPositionPair('end', 'center', 'start', 'center'),
    getConnectionPositionPair('start', 'center', 'end', 'center')
  ],
  rightTop: [
    getConnectionPositionPair('end', 'top', 'start', 'top'),
    getConnectionPositionPair('start', 'top', 'end', 'top')
  ],
  rightBottom: [
    getConnectionPositionPair('end', 'bottom', 'start', 'bottom'),
    getConnectionPositionPair('start', 'bottom', 'end', 'bottom')
  ]
};
