import { PixelFormatter } from './PixelFormatter';

describe('Formatter', () => {
    let result: any;
    let sut = PixelFormatter;
    // main testing flow
    it('should correctly add two left values', () => {
        result = sut.getWeightsAndDirection(['left: 10px', 'left:20px']);
        expect(result.length).toBe(2);
        expect(result[0].isVertical).toEqual(false);
        expect(result[1].isVertical).toEqual(false);
        expect(result[0].weight).toEqual(-1);
        expect(result[1].weight).toEqual(-1);
    });
    it('should correctly split values based on vertical/horizontal directionality', () => {
        result = sut.getValuesInAdditionForm(result);
        expect(result.verticalValues.length).toBe(0);
        expect(result.horizontalValues.length).toBe(2);
        expect(result.horizontalValues[0].isVertical).toBeFalsy();
        expect(result.horizontalValues[0].pixelValue).toBe('10');
    });
    it('should correctly perform to addition of pixels 1', () => {
        result = sut.performPixelAddition(result);
        expect(result.verticalPixels).toBeNull();
        expect(result.horizontalPixels).toBe(-30);
    });
    it('should successfully reconstruct direction values', () => {
        result = sut.reconstructDirectionalValues(result);
        expect(result.left).toBe('30px');
    });
    // Test untested conditions in this section
    it('should correctly perform to addition of pixels with horizontalValues null', () => {
        const testSet = {
            verticalValues: [{ isVertical: true, weight: -1, pixelValue: '10' },
            { isVertical: true, weight: -1, pixelValue: '20' }],
            horizontalValues:
            []
        };
        result = sut.performPixelAddition(testSet);
        expect(result.horizontalPixels).toBeNull();
        expect(result.verticalPixels).toBe(-30);
    });
});