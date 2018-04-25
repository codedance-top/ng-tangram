export declare type NtProgressSize = 'tiny' | 'small' | 'medium' | 'large';
export declare type NtProgressColor = '' | 'primary' | 'medium' | 'large';
export declare class NtProgressComponent {
    private _max;
    private _value;
    max: number;
    value: number;
    size: NtProgressSize;
    color: NtProgressColor;
    class: string;
    readonly percent: number;
}
