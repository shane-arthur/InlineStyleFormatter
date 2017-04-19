import { Validator } from '../Validator/Validator';
import { PixelFormatter } from '../PixelFormatter/PixelFormatter';
import { DirectionMappings } from '../Constants/DirectionMappings';

export const Formatter = {


    getValuesInAdditionForm(values) {
        return PixelFormatter.getValuesInAdditionForm(values);
    },

    validateInput: (styles) => {
        return PixelFormatter.getWeightsAndDirection(styles);
    },

    validate: (input) => {
        return Validator.validateInput(input);
    },


    addPixels(...styles) {
        let formattedStyles = this.performValidationAndFormatting(styles);
        let left = null;
        let right = null;
        if (formattedStyles) {
            const shot = this.getValuesInAdditionForm(formattedStyles);
        }

        return [left, right];
    },

};