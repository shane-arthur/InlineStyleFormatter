import PixelFormatter from './PixelFormatter';

describe('Formatter', () => {
    let result: any[] = [];
    let Formatter;

    beforeEach(() => {
        Formatter = new PixelFormatter();
        result = [];
    });

    it('should correctly add two left values', () => {
        result = Formatter.getWeightsAndDirection(['left: 10px', 'left:20px']);
        expect(result.length).toBe(2);
        expect(result[0].isVertical).toEqual(false);
        expect(result[1].isVertical).toEqual(false);
        expect(result[0].weight).toEqual(-1);
        expect(result[1].weight).toEqual(-1);
    });
});