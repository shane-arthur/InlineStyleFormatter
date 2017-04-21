import { Validator } from './Validator';

describe('Formatter', () => {
    let sut = Validator;

    it('should reject if directional value isnt one of the four acceptable types', () => {
        expect(() => {
            sut.validateInput(['leftd: 10px', 'left:20px']);
        }).toThrowError('Direction value : leftd is not a valid direction.');
    });
    it('should reject one value is not a proper pixel value', () => {
        expect(() => {
            sut.validateInput(['left: 10px', 'left:20pdx']);
        }).toThrowError('Cannot find a valid pixel value for 20pdx.');
    });
    it('should reject if there are no values to validate against', () => {
        expect(() => {
            sut.validateInput([]);
        }).toThrowError('You must pass some styles to perform and operation against.');
    });
});