export interface PixelObject {
    type: DirectionType,
    value: string,
    isVertical: boolean
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