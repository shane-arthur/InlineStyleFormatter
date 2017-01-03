import { styleUtil } from './Wrappers/FormatterWrapper';
import { OffsetObject, weightedMappings, Directions } from './interfaces/PixelObject';

export const Formatter = {
    add(styleObject: any, ...values: string[]): string[] {
        let hasStyleObject = true;
        if (typeof styleObject === 'string') {
            values.push(styleObject);
            hasStyleObject = false;
        }
        let horizontalChange: OffsetObject = null;
        let verticalChange: OffsetObject = null;
        let horizontalStyleFinal: string = null;
        let verticalStyleFinal: string = null;
        [horizontalChange, verticalChange] = styleUtil.addPixels(values);
        function reformStyleObject(type: Directions, value: number) {
            if (value !== 0) {
                switch (type) {
                    case (Directions.horizontal):
                        {
                            let horizontalStyle: [string, string] = null;
                            if (value > 0) {
                                horizontalStyle = ['left', `${value}px`];
                            }
                            else {
                                value = value * -1;
                                horizontalStyle = ['right', `${value}px`];
                            }
                            if (hasStyleObject) {
                                delete styleObject.right;
                                delete styleObject.left;
                                styleObject[horizontalStyle[0]] = horizontalStyle[1];
                            }
                            horizontalStyleFinal = `${horizontalStyle[0]} : ${horizontalStyle[1]}`;
                            break;
                        }
                    case (Directions.vertical):
                        {
                            let verticalStyle: [string, string] = null;
                            if (value > 0) {
                                verticalStyle = ['top', `${value}px`];
                            }
                            else {
                                value = value * -1;
                                verticalStyle = ['bottom', `${value}px`];
                            }
                            if (hasStyleObject) {
                                delete styleObject.top;
                                delete styleObject.bottom;
                                styleObject[verticalStyle[0]] = verticalStyle[1];
                            }
                            verticalStyleFinal = `${verticalStyle[0]} : ${verticalStyle[1]}`;
                            break;
                        }
                }
            }
        }
        reformStyleObject(Directions.horizontal, horizontalChange.offsetValue);
        reformStyleObject(Directions.vertical, verticalChange.offsetValue);
        let finalStyles: string[] = [];
        if (horizontalStyleFinal) {
            finalStyles.push(horizontalStyleFinal);
        }
        if (verticalStyleFinal) {
            finalStyles.push(verticalStyleFinal);
        }
        return finalStyles;
    }
}

