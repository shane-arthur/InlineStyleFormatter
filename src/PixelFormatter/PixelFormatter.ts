import { DirectionMappings } from '../Constants/DirectionMappings';

export default class PixelFormatter {


    extractWeightedMappings(value) {
        const directionalValues = value.trim().split(':');
        const direction = directionalValues[0];
        const pixelValue = directionalValues[1].split('px')[0];

        return ({
            isVertical: DirectionMappings[direction].isVertical,
            weight: DirectionMappings[direction].weight,
            pixelValue: pixelValue
        });
    }

    getWeightsAndDirection(values) {
        return values.map(value => {
            return this.extractWeightedMappings(value);
        });
    }
}