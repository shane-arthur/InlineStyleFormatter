import { Formatter } from './Main';

describe('Formatter', () => {
    let result: any[] = [];
    let sut = Formatter;

    beforeEach(() => {
        result = [];
    });

   it('test', () => {
       let left, right = null;
        [left, right] = sut.addPixels('left: 10px', 'left: 20px', 'top: 20px', 'bottom: 100px');
        console.log(left, right);
    });
});