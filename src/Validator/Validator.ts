import { DirectionMappings } from '../Constants/DirectionMappings';


export const Validator = {

    removeWhiteSpace: (value: string): string  => {
        return value.replace(/\s/g, '');
    },

    validateAgainstDirectionalTypes: (value) => {
        return DirectionMappings[value] ? true : false;
    },

    throwValidationException(message): void {
        console.log(message);
        throw new Error(message);
    },

    validateValueStructure: (value: string): void => {
        const checkIfPixelValue = (value): boolean => {
            const splittedPixel: string[] = value.split('px');
            const pixelValue: number = this.Validator.removeWhiteSpace(splittedPixel[0]);
            return ((splittedPixel.length > 0) && (splittedPixel[1] === '') && (!isNaN(pixelValue)));
        };

        const splitValues: string[] = value.split(':');
        const directionValue: string = splitValues[0];
        const pixelValue: string = splitValues[1];

        if (!checkIfPixelValue(pixelValue)) {
            this.Validator.throwValidationException(`Cannot find a valid pixel value for ${pixelValue}.`);
        }

        if (!this.Validator.validateAgainstDirectionalTypes(directionValue)) {
            this.Validator.throwValidationException(`Direction value : ${directionValue} is not a valid direction.`);
        }
    },

    checkIfNullEntry: (values) : void => {
        if (values.length === 0) {
            this.Validator.throwValidationException('You must pass some styles to perform and operation against.');
        }
    },

    validateInput: (values) : string[] => {
        this.Validator.checkIfNullEntry(values);
        values.forEach(value => {
            this.Validator.removeWhiteSpace(value);
            this.Validator.validateValueStructure(value);
        });
        return values;
    }
};
