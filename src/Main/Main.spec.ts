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
        expect(newStyles['top']).toBe(10);
        expect(newStyles['right']).toBe(30);
    });

    it('Simulate an error being thrown and make sure it is handeled appropriately', () => {
        const newStyles = sut.addPixels('left: 10px', 'lefft: 20px', 'top: 30px', 'bottom: 40px');
        expect(newStyles[0]).toBe('There was an error performing the addition of pixels : Error: Direction value : lefft is not a valid direction.');
    });
});