"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mochaAsync = function (fn) {
    return function (done) {
        fn.call()
            .then(done, function (err) { done(err); });
    };
};
exports.default = mochaAsync;
