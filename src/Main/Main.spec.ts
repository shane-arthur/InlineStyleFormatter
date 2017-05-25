import { Formatter } from './Main';

describe('Formatter', () => {
    let result: any[] = [];
    let sut = Formatter;

    beforeEach(() => {
        result = [];
    });

    it('Test the end to end addition of pixels', () => {
        const newStyles = sut.addPixels('left: 10px', 'left: 20px', 'top: 30px', 'bottom: 40px');
        expect(Object.keys(newStyles).length).toBe(2);
        expect(newStyles['bottom']).toBe(`10px`);
        expect(newStyles['left']).toBe(`30px`);
    });

    it('Simulate an error being thrown and make sure it is handeled appropriately', () => {
        const newStyles = sut.addPixels('left: 10px', 'lefft: 20px', 'top: 30px', 'bottom: 40px');
        expect(newStyles[0]).toBe('There was an error performing the addition of pixels : Error: Direction value : lefft is not a valid direction.');
    });

    it('should be able to shrink pixels by a constant factor', () => {
        const newStyles = sut.shrinkPixels(5, 'left: 10px', 'right: 100px', 'bottom: 200px');
        expect(newStyles.bottom).toBe('40px');
        expect(newStyles.left).toBe('2px');
    });

    it('should be able to multiply pixels by a constant factor', () => {
        const newStyles = sut.growPixels(5, 'left: 10px', 'right: 10px', 'bottom: 40px');
        expect(newStyles.bottom).toBe('200px');
        expect(newStyles.right).toBe('50px');
    });
});