import { styleUtil } from './Wrappers/FormatterWrapper';
import { OffsetObject } from './interfaces/PixelObject';

export const Formatter = {
    addPixels(masterStyle: any, ...values: string[]) {
        let horizontalChange: OffsetObject = null;
        let verticalChange: OffsetObject = null;
        [horizontalChange, verticalChange] = styleUtil.addPixels(values);
        return [horizontalChange, verticalChange];
    }
}
