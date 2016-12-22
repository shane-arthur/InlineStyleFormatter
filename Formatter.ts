import { styleUtil } from './Wrappers/FormatterWrapper';

const Formatter = {
    add(...values) {
        let horizontalChange: any = 0;
        let verticalChange: any = 0;
        [horizontalChange, verticalChange] = styleUtil.addPixels(values);
        console.log(`Horizontal : ${horizontalChange.offsetValue}`);
        console.log(`Vertical: ${verticalChange.offsetValue}`);
    }
}

Formatter.add('left: 10px', 'right: 20px');