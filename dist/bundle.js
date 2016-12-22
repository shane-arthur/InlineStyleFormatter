/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FormatterWrapper_1 = __webpack_require__(1);
	var Formatter = {
	    add: function () {
	        var values = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            values[_i] = arguments[_i];
	        }
	        var horizontalChange = 0;
	        var verticalChange = 0;
	        _a = FormatterWrapper_1.styleUtil.addPixels(values), horizontalChange = _a[0], verticalChange = _a[1];
	        console.log("Horizontal : " + horizontalChange.offsetValue);
	        console.log("Vertical: " + verticalChange.offsetValue);
	        var _a;
	    }
	};
	Formatter.add('left: 10px', 'right: 20px');


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PixelObject_1 = __webpack_require__(2);
	exports.styleUtil = {
	    formPixel: function () {
	        function determineDirection(type) {
	            switch (type.toLowerCase()) {
	                case 'right':
	                    return [PixelObject_1.DirectionType.Right, false];
	                case 'left':
	                    return [PixelObject_1.DirectionType.Left, false];
	                case 'top':
	                    return [PixelObject_1.DirectionType.Top, true];
	                case 'bottom':
	                    return [PixelObject_1.DirectionType.Bottom, true];
	            }
	        }
	        this.formattedParams = this.params.map(function (param) {
	            var splittedValues = param.split(':');
	            var direction = null;
	            var isVertical = null;
	            _a = determineDirection(splittedValues[0]), direction = _a[0], isVertical = _a[1];
	            var formattedValue = { type: direction, isVertical: isVertical, value: splittedValues[1] };
	            return formattedValue;
	            var _a;
	        });
	    },
	    addPixels: function (values) {
	        this.params = values;
	        exports.styleUtil.formPixel();
	        function extractDirectionalProps() {
	            var verticalChecks = [];
	            var horizontalChecks = [];
	            verticalChecks = this.formattedParams.filter(function (param) {
	                if (param.isVertical) {
	                    return true;
	                }
	            });
	            horizontalChecks = this.formattedParams.filter(function (param) {
	                if (!param.isVertical) {
	                    return true;
	                }
	            });
	            return [verticalChecks, horizontalChecks];
	        }
	        ;
	        var verticalChecks, horizontalChecks = null;
	        var horizontalOffset = { offsetValue: 0 };
	        var verticalOffset = { offsetValue: 0 };
	        _a = extractDirectionalProps.call(this), verticalChecks = _a[0], horizontalChecks = _a[1];
	        (function addValues(horizontalValues, verticalValues) {
	            function addByType(type, collection) {
	                var accumulator = 0;
	                collection.forEach(function (entry) {
	                    accumulator += (weightedMappings[entry.type] * parseInt(entry.value.split('px')[0]));
	                });
	                type.offsetValue = accumulator;
	            }
	            addByType(verticalOffset, verticalValues);
	            addByType(horizontalOffset, horizontalValues);
	        })(horizontalChecks, verticalChecks);
	        return [horizontalOffset, verticalOffset];
	        var _a;
	    },
	};
	var directionTypeMappings = {
	    0: 'top',
	    1: 'left',
	    2: 'bottom',
	    3: 'right'
	};
	var weightedMappings = {
	    0: 1,
	    1: 1,
	    2: -1,
	    3: -1
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	;
	var DirectionType;
	(function (DirectionType) {
	    DirectionType[DirectionType["Top"] = 0] = "Top";
	    DirectionType[DirectionType["Left"] = 1] = "Left";
	    DirectionType[DirectionType["Bottom"] = 2] = "Bottom";
	    DirectionType[DirectionType["Right"] = 3] = "Right";
	})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
	;
	var Directions;
	(function (Directions) {
	    Directions[Directions["horizontal"] = 0] = "horizontal";
	    Directions[Directions["vertical"] = 1] = "vertical";
	})(Directions = exports.Directions || (exports.Directions = {}));
	;


/***/ }
/******/ ]);