import { styleUtil } from './FormatterWrapper';
import { OffsetObject } from '../interfaces/PixelObject';


describe('FormatterWrapper', () => {
    let valuesToTest: string[];
    let horizontalChange: OffsetObject;
    let verticalChange: OffsetObject;

    beforeEach(() => {
        valuesToTest = null;
        horizontalChange = null;
        verticalChange = null;
    });

    const performAddition = () => {
        [horizontalChange, verticalChange] = styleUtil.addPixels(valuesToTest);
    };

    it('should correctly add two values', () => {
        valuesToTest = ['left: 10px', 'left: 120px'];
        performAddition();
        expect(horizontalChange.offsetValue).toBe(130);
        expect(verticalChange.offsetValue).toBe(0);
    });

    it('should disregard direction values not l/r/t/b', () => {
        valuesToTest = ['leftBull: 10px', 'left: 120px'];
        performAddition();
        expect(horizontalChange.offsetValue).toBe(120);
        expect(verticalChange.offsetValue).toBe(0);
    });

    it('should add both vertical and horizontal values', () => {
        valuesToTest = ['left : 100px', 'right: 200px', 'top: 100px', 'bottom: 50px'];
        performAddition();
        expect(horizontalChange.offsetValue).toBe(-100);
        expect(verticalChange.offsetValue).toBe(50);
    });
    it('should do some thing', () => {
        const values: string[] = styleUtil.multiplyPixels(['left: 10px', ' right : 120 px'], (1 / 2));
       expect(values.length).toBe(2);
       expect(values[0]).toBe('left: 5px');
       expect(values[1]).toBe('right: 60px');
    });
});