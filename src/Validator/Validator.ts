import { DirectionMappings } from '../Constants/DirectionMappings';


export const Validator = {

    removeWhiteSpace: (value) => {
        return value.replace(/\s/g, '');
    },

    validateAgainstDirectionalTypes: (value) => {
        return DirectionMappings[value] ? true : false;
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
            console.log(`Cannot find a valid pixel value for ${pixelValue}`);
            return false;
        }

        if (!this.Validator.validateAgainstDirectionalTypes(directionValue)) {
            console.log(`Direction value : ${directionValue} is not a valid direction.`);
            return false;
        }

        return true;

    },

    validateInput: (values) => {
        if (values.length === 0) {
            return false;
        }
        let passedValidation = true;
        values.forEach(value => {
            this.Validator.removeWhiteSpace(value);
            if (!this.Validator.validateValueStructure(value)) {
                passedValidation = false;
            }
        });
        return passedValidation;
    }
};
