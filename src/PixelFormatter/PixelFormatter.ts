import { DirectionMappings, Directions } from '../Constants/DirectionMappings';
import { WeightedMappings, AdditionFormat, PixelValues } from '../Interfaces/Mappings';

export const PixelFormatter = {
    getWeightsAndDirection: (values) => {
        return values.map(value => {
            return this.PixelFormatter.extractWeightedMappings(value);
        });
    },

    extractWeightedMappings: (value): WeightedMappings => {
        const directionalValues: string[] = value.trim().split(':');
        const direction: string = directionalValues[0];
        const pixelValue: string = directionalValues[1].split('px')[0].trim();

        return ({
            isVertical: DirectionMappings[direction].isVertical,
            weight: DirectionMappings[direction].weight,
            pixelValue: pixelValue
        });
    },

    getValuesInAdditionForm: (values): AdditionFormat => {
        const getValues = (isVertical): string[] => {
            return values.filter(value => value.isVertical === isVertical);
        };
        return { verticalValues: getValues(true), horizontalValues: getValues(false) };
    },

    performPixelAddition: (values): PixelValues => {
        const { verticalValues, horizontalValues } = values;
        const performAddition = (input: any[]): number => {
            let pixelTotal: number = null;
            input.forEach(value => {
                pixelTotal += (value.weight * value.pixelValue);
            });
            return pixelTotal;
        };
        const verticalPixels: number = verticalValues.length > 0 ? performAddition(verticalValues) : null;
        const horizontalPixels: number = horizontalValues.length > 0 ? performAddition(horizontalValues) : null;

        return { verticalPixels: verticalPixels, horizontalPixels: horizontalPixels };
    },

    reconstructDirectionalValues: (addedPixels): any => {
        const findCorrespondingDirection = (pixelValue: number, higherAndLowerValuesForPixels) => {
            const direction: string = pixelValue >= 0 ? higherAndLowerValuesForPixels.lower : higherAndLowerValuesForPixels.higher;
            return { [direction]: pixelValue ? Math.abs(pixelValue) : null };
        };

        const finalStyle: any = {};
        const formStyleObject = (styles): void => {
            const keys: string[] = Object.keys(styles);
            finalStyle[keys[0]] = styles[keys[0]];
        };
        formStyleObject(findCorrespondingDirection(addedPixels.verticalPixels, { lower: 'bottom', higher: 'top' }));
        formStyleObject(findCorrespondingDirection(addedPixels.horizontalPixels, { lower: 'left', higher: 'right' }));
        return finalStyle;
    }
};
