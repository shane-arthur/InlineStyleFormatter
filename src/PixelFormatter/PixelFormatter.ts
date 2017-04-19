import { DirectionMappings } from '../Constants/DirectionMappings';

export const PixelFormatter = {
    extractWeightedMappings: (value) => {
        const directionalValues = value.trim().split(':');
        const direction = directionalValues[0];
        const pixelValue = directionalValues[1].split('px')[0];

        return ({
            isVertical: DirectionMappings[direction].isVertical,
            weight: DirectionMappings[direction].weight,
            pixelValue: pixelValue
        });
    },

    getWeightsAndDirection: (values) => {
        return values.map(value => {
            return this.PixelFormatter.extractWeightedMappings(value);
        });
    },

    getValuesInAdditionForm: (values) => {
        const getValues = (isVertical) => {
            return values.filter(value => value.isVertical === isVertical);
        };

        const verticalArray = getValues(true);
        const horizontalArray = getValues(false);

        return {verticalValues: verticalArray, horizontalValues: horizontalArray};
    },

    performPixelAddition: (values) => {
        const { verticalValues, horizontalValues } = values;
        const performAddition = (values) => {
            values.reduce(value => {
                return (value.weight * value.pixelValue);
            })
        }


        const verticalPixels = performAddition(verticalValues);
        const horizontalPixels = performAddition(horizontalValues);

        console.log('Lil Bitch!');
        console.log(verticalPixels, horizontalPixels);
        
    }
};
