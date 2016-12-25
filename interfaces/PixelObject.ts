export interface PixelObject {
    type: DirectionType,
    value: string,
    isVertical: boolean
};

export interface OffsetObject { 
    offsetValue : number
};

export enum DirectionType {
    Top,
    Left,
    Bottom,
    Right,
};

export enum Directions {
    horizontal,
    vertical
};