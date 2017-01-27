import { Formatter } from './Formatter';

describe('Formatter', () => {
    let result: any[] = [];

    beforeEach(() => {
        result = [];
    });

    it('should correctly add two left values', () => {
        result = Formatter.add('left: 10px', 'left:20px');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual({ left: '30px' });
    });

    it('should correctly add two bottom values', () => {
        result = Formatter.add('top:10px', 'bottom: 30px');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual({ bottom: '20px' });
    });

    it('should correctly add two right values', () => {
        result = Formatter.add('right: 10px', 'right:20px');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual({ right: '30px' });
    });

    it('should correctly add two top values', () => {
        result = Formatter.add('top:40px', 'bottom: 30px');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual({ top: '10px' });
    });

    it('should perform addition on object with existing props', () => {
        let existingStyles = { left: '10px', top: '10px' };
        Formatter.add(existingStyles, 'bottom:20px', 'right:20px');
        expect(Object.keys(existingStyles).length).toBe(2);
        expect(existingStyles['right']).toEqual('10px');
        expect(existingStyles['bottom']).toEqual('10px');
    });

});
