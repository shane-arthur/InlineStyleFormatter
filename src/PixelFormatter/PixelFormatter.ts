import { DirectionMappings, Directions } from '../Constants/DirectionMappings';

export const PixelFormatter = {
    getWeightsAndDirection: (values) => {
        return values.map(value => {
            return this.PixelFormatter.extractWeightedMappings(value);
        });
    },

    extractWeightedMappings: (value) => {
        const directionalValues = value.trim().split(':');
        const direction = directionalValues[0];
        const pixelValue = directionalValues[1].split('px')[0].trim();

        return ({
            isVertical: DirectionMappings[direction].isVertical,
            weight: DirectionMappings[direction].weight,
            pixelValue: pixelValue
        });
    },

    getValuesInAdditionForm: (values) => {
        const getValues = (isVertical) => {
            return values.filter(value => value.isVertical === isVertical);
        };
        return { verticalValues: getValues(true), horizontalValues: getValues(false) };
    },

    performPixelAddition: (values) => {
        const { verticalValues, horizontalValues } = values;
        const performAddition = (input) => {
            let pixelTotal = null;
            input.forEach(value => {
                pixelTotal += (value.weight * value.pixelValue);
            });
            return pixelTotal;
        };
        const verticalPixels = verticalValues.length > 0 ? performAddition(verticalValues) : null;
        const horizontalPixels = horizontalValues.length > 0 ? performAddition(horizontalValues) : null;

        return { verticalPixels: verticalPixels, horizontalPixels: horizontalPixels };
    },

    reconstructDirectionalValues: (addedPixels) => {
        const findCorrespondingDirection = (pixelValue, higherAndLowerValuesForPixels) => {
            const direction = pixelValue >= 0 ? higherAndLowerValuesForPixels.lower : higherAndLowerValuesForPixels.higher;
            return { [direction] : pixelValue ? Math.abs(pixelValue) : null };
        };

        const finalStyle = {};
        const formStyleObject = (styles) => {
            const keys = Object.keys(styles);
            finalStyle[keys[0]] = styles[keys[0]];
        };
        const vertical = formStyleObject(findCorrespondingDirection(addedPixels.verticalPixels, { lower: 'bottom', higher: 'top' }));
        const horizontal = formStyleObject(findCorrespondingDirection(addedPixels.horizontalPixels, { lower: 'left', higher: 'right' }));
        return finalStyle;
    }
};
