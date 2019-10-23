import {
  ConnectionPositionPair,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';

export enum NtOverlayPosition {
  Bottom = 'bottom',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
  Top = 'top',
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  Left = 'left',
  LeftTop = 'leftTop',
  LeftBottom = 'leftBottom',
  Right = 'right',
  RightTop = 'rightTop',
  RightBottom = 'rightBottom'
}

export enum NtOverlayOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

/**
 * 定义并返回一个 overlay 窗体定位
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

/**
 *
 * @param position
 */
export function getPositionOrientation(position: string): NtOverlayOrientation {
  return Object.keys(NT_OVERLAY_POSITION_PAIRS).indexOf(position) > 5
    ? NtOverlayOrientation.Horizontal
    : NtOverlayOrientation.Vertical;
}

/**
 * Overley 方向定位常量
 */
export const [
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
  TOP_LEFT, TOP_CENTER, TOP_RIGHT,
  LEFT_TOP, LEFT_CENTER, LEFT_BOTTOM,
  RIGHT_TOP, RIGHT_CENTER, RIGHT_BOTTOM
] = [
  getConnectionPositionPair('start', 'bottom', 'start', 'top'),
  getConnectionPositionPair('center', 'bottom', 'center', 'top'),
  getConnectionPositionPair('end', 'bottom', 'end', 'top'),
  getConnectionPositionPair('start', 'top', 'start', 'bottom'),
  getConnectionPositionPair('center', 'top', 'center', 'bottom'),
  getConnectionPositionPair('end', 'top', 'end', 'bottom'),
  getConnectionPositionPair('start', 'top', 'end', 'top'),
  getConnectionPositionPair('start', 'center', 'end', 'center'),
  getConnectionPositionPair('start', 'bottom', 'end', 'bottom'),
  getConnectionPositionPair('end', 'top', 'start', 'top'),
  getConnectionPositionPair('end', 'center', 'start', 'center'),
  getConnectionPositionPair('end', 'bottom', 'start', 'bottom')
];

/**
 * 定位策略
 */
export const NT_OVERLAY_POSITION_PAIRS = {

  bottom: [
    BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT,
    TOP_CENTER, TOP_LEFT, TOP_RIGHT,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM
  ],

  bottomLeft: [
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM
  ],

  bottomRight: [
    BOTTOM_RIGHT, BOTTOM_CENTER, BOTTOM_LEFT,
    TOP_RIGHT, TOP_CENTER, TOP_LEFT,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM
  ],

  top: [
    TOP_CENTER, TOP_LEFT, TOP_RIGHT,
    BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM
  ],

  topLeft: [
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM
  ],

  topRight: [
    TOP_RIGHT, TOP_CENTER, TOP_LEFT,
    BOTTOM_RIGHT, BOTTOM_CENTER, BOTTOM_LEFT,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM
  ],

  left: [
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM
  ],

  leftTop: [
    LEFT_TOP, LEFT_CENTER, LEFT_BOTTOM,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    RIGHT_TOP, RIGHT_CENTER, RIGHT_BOTTOM
  ],

  leftBottom: [
    LEFT_BOTTOM, LEFT_CENTER, LEFT_TOP,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    RIGHT_BOTTOM, RIGHT_CENTER, RIGHT_TOP
  ],

  right: [
    RIGHT_CENTER, RIGHT_TOP, RIGHT_BOTTOM,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    LEFT_CENTER, LEFT_TOP, LEFT_BOTTOM
  ],

  rightTop: [
    RIGHT_TOP, RIGHT_CENTER, RIGHT_BOTTOM,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    LEFT_TOP, LEFT_CENTER, LEFT_BOTTOM
  ],

  rightBottom: [
    RIGHT_BOTTOM, RIGHT_CENTER, RIGHT_TOP,
    TOP_LEFT, TOP_CENTER, TOP_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
    LEFT_BOTTOM, LEFT_CENTER, LEFT_TOP
  ],
};
