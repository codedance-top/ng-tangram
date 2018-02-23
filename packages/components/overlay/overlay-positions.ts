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
function toConnectionPositionPair(
  originX: HorizontalConnectionPos, originY: VerticalConnectionPos,
  overlayX: HorizontalConnectionPos, overlayY: VerticalConnectionPos) {
  return { originX, originY, overlayX, overlayY } as ConnectionPositionPair;
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
    toConnectionPositionPair('center', 'bottom', 'center', 'top'),
    toConnectionPositionPair('center', 'top', 'center', 'bottom')
  ],
  bottomLeft: [
    toConnectionPositionPair('start', 'bottom', 'start', 'top'),
    toConnectionPositionPair('start', 'top', 'start', 'bottom')
  ],
  bottomRight: [
    toConnectionPositionPair('end', 'bottom', 'end', 'top'),
    toConnectionPositionPair('end', 'top', 'end', 'bottom')
  ],

  top: [
    toConnectionPositionPair('center', 'top', 'center', 'bottom'),
    toConnectionPositionPair('center', 'bottom', 'center', 'top')
  ],
  topLeft: [
    toConnectionPositionPair('start', 'top', 'start', 'bottom'),
    toConnectionPositionPair('start', 'bottom', 'start', 'top')
  ],
  topRight: [
    toConnectionPositionPair('end', 'top', 'end', 'bottom'),
    toConnectionPositionPair('end', 'bottom', 'end', 'top')
  ],

  left: [
    toConnectionPositionPair('start', 'center', 'end', 'center'),
    toConnectionPositionPair('end', 'center', 'start', 'center')
  ],
  leftTop: [
    toConnectionPositionPair('start', 'top', 'end', 'top'),
    toConnectionPositionPair('end', 'top', 'start', 'top')
  ],
  leftBottom: [
    toConnectionPositionPair('start', 'bottom', 'end', 'bottom'),
    toConnectionPositionPair('end', 'bottom', 'start', 'bottom')
  ],

  right: [
    toConnectionPositionPair('end', 'center', 'start', 'center'),
    toConnectionPositionPair('start', 'center', 'end', 'center')
  ],
  rightTop: [
    toConnectionPositionPair('end', 'top', 'start', 'top'),
    toConnectionPositionPair('start', 'top', 'end', 'top')
  ],
  rightBottom: [
    toConnectionPositionPair('end', 'bottom', 'start', 'bottom'),
    toConnectionPositionPair('start', 'bottom', 'end', 'bottom')
  ]
};
