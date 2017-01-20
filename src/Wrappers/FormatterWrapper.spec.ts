import { styleUtil } from './FormatterWrapper';
import { OffsetObject } from '../interfaces/PixelObject';

describe('FormatterWrapper', () => {
    it('should correctly add two values', () => {
        const valuesToTest: string[] = ['left: 10px', 'left: 120px'];

        let horizontalChange: OffsetObject = null;
        let verticalChange: OffsetObject = null;
        [horizontalChange, verticalChange] = styleUtil.addPixels(valuesToTest)
        expect(horizontalChange.offsetValue).toBe(130);
        expect(verticalChange.offsetValue).toBe(0);
    });

    it('should disregard direction values not l/r/t/b', () => {
        const valuesToTest: string[] = ['leftBull: 10px', 'left: 120px'];
        let horizontalChange: OffsetObject = null;
        let verticalChange: OffsetObject = null;
        [horizontalChange, verticalChange] = styleUtil.addPixels(valuesToTest);
        expect(horizontalChange.offsetValue).toBe(120);
        expect(verticalChange.offsetValue).toBe(0);
    });

    it('should add both vertical and horizontal values', () => {
        const valuesToTest: string[] = ['left : 100px', 'right: 200px', 'top: 100px', 'bottom: 50px'];
        let horizontalChange: OffsetObject = null;
        let verticalChange: OffsetObject = null;
        [horizontalChange, verticalChange] = styleUtil.addPixels(valuesToTest);
        expect(horizontalChange.offsetValue).toBe(-100);
        expect(verticalChange.offsetValue).toBe(50);
    });
});