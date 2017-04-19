/*import { Validator } from './Validator';

describe('Formatter', () => {
    let result: boolean;
    let sut = Validator;

    beforeEach(() => {
        result = null;
    });

    it('should correctly return true when passing validation', () => {
        result = sut.validateInput(['left: 10px', 'left:20px']);
        expect(result).toBeTruthy();
    });

    it('should reject if directional value isnt one of the four acceptable types', () => {
        result = sut.validateInput(['leftd: 10px', 'left:20px']);
        expect(result).toBeFalsy();
    });
      it('should reject if value is not a pixel value', () => {
        result = sut.validateInput(['left: 10px', 'left:20pdx']);
        expect(result).toBeFalsy();
    });
}); */