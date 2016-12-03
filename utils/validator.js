/* globals module */
"use strict";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const imgURLPattern = /:\/\//;

module.exports = {
    validateIsStringValid(value) {
        if (value) {
            let valueToCheck = value.trim();
            return valueToCheck !== "";
        }

        return false;
    },
    validateStringLength(value, min, max) {
        return min < value.length && value.length < max;
    },
    validateIfNumber(number) {
        return typeof number === "number";
    },
    validateEmail(email) {
        return emailRegex.test(email);
    },
    validateImageUrl(imageUrl) {
        return imgURLPattern.test(imageUrl);
    }
};