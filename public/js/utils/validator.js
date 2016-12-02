/* globals */

var validator = {
    validateStringLength(value, min, max) {
        return min < value.length && value.length < max;
    },
    validateIsStringValid(value) {
        if (value) {
            let valueToCheck = value.trim();
            return valueToCheck !== "";
        }

        return false;
    }
};