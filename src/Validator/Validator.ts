import { DirectionMappings } from '../Constants/DirectionMappings';

export default class Validator {

    removeWhiteSpace(value) {
        return value.replace(/\s/g, '');
    }

    validateAgainstDirectionalTypes(value) {
        return DirectionMappings[value] ? true : false;
    }

    validateValueStructure(value) {

        const splitValues = value.split(':');
        const directionValue = splitValues[0];
        const pixelValue = splitValues[1];
        const splitPixelValue = pixelValue.split(':');

        if (typeof directionValue !== 'string') {
            console.log(`Direction value : ${value}`);
        }
        if (splitPixelValue[1] !== 'px') {
            return false;
        }
    }


    validateInput(values) {
        if (values.length === 0) {
            return false;
        }
        let passedValidation = true;
        values.forEach(value => {
            this.removeWhiteSpace(value);
            if (!this.validateAgainstDirectionalTypes(value)) {
                console.log(`Direction Type : ${value}`);
                passedValidation = false;
            }
        });
        return passedValidation;
    }

}