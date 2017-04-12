import Validator from './Validator';

describe('Formatter', () => {
    let result: boolean;
    let pixelValidator;

    beforeEach(() => {
        pixelValidator = new Validator();
        result = null;
    });

    it('should correctly return true when passing validation', () => {
        result = pixelValidator.validateInput(['left: 10px', 'left:20px']);
        expect(result).toBeTruthy();
    });

    it('should reject if directional value isnt one of the four acceptable types', () => {
        result = pixelValidator.validateInput(['leftd: 10px', 'left:20px']);
        expect(result).toBeFalsy();
    });
});