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
        const getValues = (isVertical): WeightedMappings[] => {
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

    performPixelMultiplication: (values: AdditionFormat, factor): any => {
        const getPixelValuesInCorrectFormat = (key: string) => {
            return values[key].map(value => {
                return ((value.weight * Number(value.pixelValue)) * factor);
            });
        };

        const pixelValue = { verticalPixels: null, horizontalPixels: null };

        pixelValue.verticalPixels = getPixelValuesInCorrectFormat('verticalValues');
        pixelValue.horizontalPixels = getPixelValuesInCorrectFormat('horizontalValues');
        return pixelValue;
    },

    findCorrespondingDirection: (pixelValue: number, higherAndLowerValuesForPixels) => {
        const direction: string = pixelValue >= 0 ? higherAndLowerValuesForPixels.lower : higherAndLowerValuesForPixels.higher;
        return { [direction]: pixelValue ? Math.abs(pixelValue) : null };
    },

    reconstructDirectionalValues: (addedPixels): any => {
        const finalStyle: any = {};
        const formStyleObject = (styles: any): void => {
            const keys: string[] = Object.keys(styles);
            if (styles[keys[0]]) {
                finalStyle[keys[0]] = `${styles[keys[0]]}px`;
            }
        };

        const performStyling = (pixelValues, higherLowerValueObject) => {
            if (typeof pixelValues !== 'number' && pixelValues) {
                pixelValues.forEach(pixelValue => {
                    formStyleObject(this.PixelFormatter.findCorrespondingDirection(pixelValue, higherLowerValueObject));
                });
            }
            else {
                formStyleObject(this.PixelFormatter.findCorrespondingDirection(pixelValues, higherLowerValueObject));
            }
        };
        performStyling(addedPixels.verticalPixels, { lower: 'bottom', higher: 'top' });
        performStyling(addedPixels.horizontalPixels, { lower: 'left', higher: 'right' });
        return finalStyle;
    }
};
