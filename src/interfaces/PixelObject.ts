export interface PixelObject {
    type: DirectionType;
    value: string;
    isVertical: boolean;
};

export interface OffsetObject {
    offsetValue: number;
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

export const weightedMappings = {
    0: 1,
    1: 1,
    2: -1,
    3: -1
};