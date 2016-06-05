var horseCodeModule = angular.module('horseCode', []);

horseCodeModule.controller("horseController", function() {
    this.ascii;

    this.horseMap = function(character) {
        switch(character.toLowerCase()) {
            case 'a': return "🐴 🐎";
            case 'b': return "🐎 🐴 🐴 🐴";
            case 'c': return "🐎 🐴 🐎 🐴";
            case 'd': return "🐎 🐴 🐴";
            case 'e': return "🐴";
            case 'f': return "🐴 🐴 🐎 🐴";
            case 'g': return "🐎 🐎 🐴";
            case 'h': return "🐴 🐴 🐴 🐴";
            case 'i': return "🐴 🐴";
            case 'j': return "🐴 🐎";
            case 'k': return "🐎 🐴 🐎";
            case 'l': return "🐴 🐎 🐴 🐴";
            case 'm': return "🐎 🐎";
            case 'n': return "🐎 🐴";
            case 'o': return "🐎 🐎 🐎";
            case 'p': return "🐴 🐎 🐎 🐴";
            case 'q': return "🐎 🐎 🐴 🐎";
            case 'r': return "🐴 🐎 🐴";
            case 's': return "🐴 🐴 🐴";
            case 't': return "🐎";
            case 'u': return "🐴 🐴 🐎";
            case 'v': return "🐴 🐴 🐴 🐎";
            case 'w': return "🐴 🐎 🐎";
            case 'x': return "🐎 🐴 🐴 🐎";
            case 'y': return "🐎 🐴 🐎 🐎";
            case 'z': return "🐎 🐎 🐴 🐴";
            case ' ': return " / ";
        }
        return "🦄";
    };

    this.horse = function(ascii) {
        if(ascii != undefined && ascii != "") {
            return ascii
                .split('')
                //.map(String.toLowerCase)
                .map(this.horseMap)
                .reduce(function (current, previous) {
                    return current + "   " + previous;
                });
        }
        return "";
    };
});

