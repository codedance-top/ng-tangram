export declare type NtButtonStyle = '' | 'hollow' | 'clear';
export declare type NtButtonColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtButtonSize = '' | 'tiny' | 'small' | 'large' | 'medium';
export declare class NtButtonComponent {
    private _style;
    private _expanded;
    class: string;
    color: NtButtonColor;
    size: NtButtonSize;
    _default: NtButtonStyle;
    style: NtButtonStyle;
    expanded: boolean;
    private _validStyle(value);
}
