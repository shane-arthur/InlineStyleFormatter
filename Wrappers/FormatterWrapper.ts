import { DirectionType, PixelObject } from '../interfaces/PixelObject';

export const styleUtil = {
    formPixel() {
        function determineDirection(type) {
            switch (type.toLowerCase()) {
                case 'right':
                    return [DirectionType.Right, false];
                case 'left':
                    return [DirectionType.Left, false];
                case 'top':
                    return [DirectionType.Top, true];
                case 'bottom':
                    return [DirectionType.Bottom, true];
            }
        }
        this.formattedParams = this.params.map(param => {
            const splittedValues = param.split(':');
            let direction = null;
            let isVertical = null;
            [direction, isVertical] = determineDirection(splittedValues[0]);
            const formattedValue : PixelObject = { type: direction, isVertical: isVertical, value: splittedValues[1] };
            return formattedValue;
        });
    },
    addPixels(values) {
        this.params = values;
        styleUtil.formPixel();
        function extractDirectionalProps() {
            let verticalChecks = [];
            let horizontalChecks = [];
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
        let horizontalOffset = { offsetValue: 0 };
        let verticalOffset = { offsetValue: 0 };
        [verticalChecks, horizontalChecks] = extractDirectionalProps.call(this);
        (function addValues(horizontalValues, verticalValues) {
            function addByType(type, collection) {
                let accumulator = 0;
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

const directionTypeMappings = {
    0: 'top',
    1: 'left',
    2: 'bottom',
    3: 'right'
};

const weightedMappings = {
    0: 1,
    1: 1,
    2: -1,
    3: -1
};


