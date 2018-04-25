import { ConnectionPositionPair, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
export declare type NtOverlayPosition = 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';
export declare enum NtOverlayOrientation {
    Vertical = "vertical",
    Horizontal = "horizontal",
}
export declare const OVERLAY_POSITIONS: {
    bottom: ConnectionPositionPair[];
    bottomLeft: ConnectionPositionPair[];
    bottomRight: ConnectionPositionPair[];
    top: ConnectionPositionPair[];
    topLeft: ConnectionPositionPair[];
    topRight: ConnectionPositionPair[];
    left: ConnectionPositionPair[];
    leftTop: ConnectionPositionPair[];
    leftBottom: ConnectionPositionPair[];
    right: ConnectionPositionPair[];
    rightTop: ConnectionPositionPair[];
    rightBottom: ConnectionPositionPair[];
};
/**
 * 定义并返回一个 overlay 窗体定位
 * @param originX 主体的中心x轴，窗体会相对于主体的中心点定位。
 * @param originY 主体的中心y轴，窗体会相对于主体的中心点定位。
 * @param overlayX 窗体的中心x轴。
 * @param overlayY 窗体的中心y轴。
 */
export declare function getConnectionPositionPair(originX: HorizontalConnectionPos, originY: VerticalConnectionPos, overlayX: HorizontalConnectionPos, overlayY: VerticalConnectionPos): ConnectionPositionPair;
/**
 * 获取定位名称拼接字符串
 * @param pair 定位类型。
 */
export declare function getPositionClassName(pair: ConnectionPositionPair): string;
export declare function getPositionOrientation(position: string): NtOverlayOrientation;
