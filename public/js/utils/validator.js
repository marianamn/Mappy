/* globals */

var validator = {
    validateStringLength(value, min, max) {
        return min < value.length && value.length < max;
    }
};