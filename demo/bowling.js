"use strict";
exports.__esModule = true;
var ReadLine = require("readline");
var Bowling = /** @class */ (function () {
    function Bowling() {
        this.readline = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    Bowling.prototype.getSequence = function () {
        var _this = this;
        this.readline.question("please enter sequence:", function (answer) {
            console.log("an:", answer);
            _this.getSequence();
        });
    };
    return Bowling;
}());
var bowling = new Bowling();
bowling.getSequence();
