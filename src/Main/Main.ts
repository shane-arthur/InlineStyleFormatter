import { Validator } from '../Validator/Validator';
import { PixelFormatter } from '../PixelFormatter/PixelFormatter';
import { DirectionMappings } from '../Constants/DirectionMappings';

export const Formatter = {

    validateAndRemoveWhiteSpace: (input) => {
        return Validator.validateInput(input);
    },

    addPixels(...styles) {
        try {
            const performAddPixels = (values) => {
                return PixelFormatter.reconstructDirectionalValues(PixelFormatter.performPixelAddition(PixelFormatter.getValuesInAdditionForm(PixelFormatter.getWeightsAndDirection(values))));
            };
            return performAddPixels(this.validateAndRemoveWhiteSpace(styles));
        }
        catch (error) {
            return [`There was an error performing the addition of pixels : ${error}`];
        }
    },
};