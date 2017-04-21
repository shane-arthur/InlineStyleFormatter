import { Validator } from '../Validator/Validator';
import { PixelFormatter } from '../PixelFormatter/PixelFormatter';
import { DirectionMappings } from '../Constants/DirectionMappings';

export const Formatter = {

    validateAndRemoveWhiteSpace: (input: string): string[] => {
        return Validator.validateInput(input);
    },

    addPixels(...styles: string[]): any {
        try {
            return PixelFormatter.reconstructDirectionalValues(
                PixelFormatter.performPixelAddition(
                    PixelFormatter.getValuesInAdditionForm(
                        PixelFormatter.getWeightsAndDirection(
                            (this.validateAndRemoveWhiteSpace(styles))
                        )
                    )
                )
            );
        }
        catch (error) {
            return [`There was an error performing the addition of pixels : ${error}`];
        }
    },
};