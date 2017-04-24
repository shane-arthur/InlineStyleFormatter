
export interface WeightedMappings {
    isVertical: boolean;
    weight: number;
    pixelValue: string;
};

export interface AdditionFormat {
    verticalValues: WeightedMappings[];
    horizontalValues: WeightedMappings[];
};

export interface PixelValues {
    verticalPixels: number;
    horizontalPixels: number;
};