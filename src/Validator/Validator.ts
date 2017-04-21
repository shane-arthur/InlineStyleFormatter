import { DirectionMappings } from '../Constants/DirectionMappings';


export const Validator = {

    removeWhiteSpace: (value) => {
        return value.replace(/\s/g, '');
    },

    validateAgainstDirectionalTypes: (value) => {
        return DirectionMappings[value] ? true : false;
    },

    throwValidationException(message) {
        console.log(message);
        throw new Error(message);
    },

    validateValueStructure: (value) => {
        const checkIfPixelValue = (value) => {
            const splittedPixel = value.split('px');
            return ((splittedPixel.length > 0) && (splittedPixel[1] === ''));
        };

        const splitValues = value.split(':');
        const directionValue = splitValues[0];
        const pixelValue = splitValues[1];
        const splitPixelValue = pixelValue.split(':');


        if (!checkIfPixelValue(pixelValue)) {
            this.Validator.throwValidationException(`Cannot find a valid pixel value for ${pixelValue}.`);
        }

        if (!this.Validator.validateAgainstDirectionalTypes(directionValue)) {
            this.Validator.throwValidationException(`Direction value : ${directionValue} is not a valid direction.`);
        }
    },

    checkIfNullEntry: (values) => {
        if (values.length === 0) {
            this.Validator.throwValidationException('You must pass some styles to perform and operation against.');
        }
    },

    validateInput: (values) => {
        this.Validator.checkIfNullEntry(values);
        values.forEach(value => {
            this.Validator.removeWhiteSpace(value);
            this.Validator.validateValueStructure(value);
        });
        return values;
    }
};
