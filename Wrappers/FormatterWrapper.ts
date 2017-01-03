import { DirectionType, PixelObject, OffsetObject, weightedMappings } from '../interfaces/PixelObject';

export const styleUtil = {
    formPixel(): void {
        function determineDirection(type: string): [DirectionType, boolean] {
            switch (type.toLowerCase()) {
                case 'right':
                    return [DirectionType.Right, false];
                case 'left':
                    return [DirectionType.Left, false];
                case 'top':
                    return [DirectionType.Top, true];
                case 'bottom':
                    return [DirectionType.Bottom, true];
                default:
                    return [-1, true];
            }
        }
        this.formattedParams = this.params.map(param => {
            const splittedValues: string[] = param.split(':');
            let direction: DirectionType = null;
            let isVertical: boolean = null;
            [direction, isVertical] = determineDirection(splittedValues[0]);
            const formattedValue: PixelObject = { type: direction, isVertical: isVertical, value: splittedValues[1] };
            return formattedValue;
        });
    },
    addPixels(values): [OffsetObject, OffsetObject] {
        this.params = values;
        styleUtil.formPixel();
        function extractDirectionalProps(): [boolean[], boolean[]] {
            let verticalChecks: boolean[] = [];
            let horizontalChecks: boolean[] = [];
            verticalChecks = this.formattedParams.filter(param => {
                if (param.isVertical) {
                    return true;
                }
            });
            horizontalChecks = this.formattedParams.filter(param => {
                if (!param.isVertical) {
                    return true;
                }
            });
            return [verticalChecks, horizontalChecks];
        };
        let verticalChecks, horizontalChecks = null;
        let horizontalOffset: OffsetObject = { offsetValue: 0 };
        let verticalOffset: OffsetObject = { offsetValue: 0 };
        [verticalChecks, horizontalChecks] = extractDirectionalProps.call(this);
        (function addValues(horizontalValues, verticalValues) : void {
            function addByType(type : OffsetObject, collection) : void {
                let accumulator : number = 0;
                collection.forEach(entry => {
                    accumulator += (weightedMappings[entry.type] * parseInt(entry.value.split('px')[0]));
                })
                type.offsetValue = accumulator;
            }
            addByType(verticalOffset, verticalValues);
            addByType(horizontalOffset, horizontalValues);
        })(horizontalChecks, verticalChecks);
        return [horizontalOffset, verticalOffset];
    },
}



