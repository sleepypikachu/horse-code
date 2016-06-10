var horseCodeModule = angular.module('horseCode', []);

horseCodeModule.constant("LABELS", {
    "TEXT" : "Text",
    "HORSE": "Horse Code"
});

horseCodeModule.controller("horseController",['LABELS', function(LABELS) {
    this.source;
    this.sourceLabel = LABELS.TEXT;
    this.resultLabel = LABELS.HORSE;

    this.horseMap = function(character) {
        switch(character.toLowerCase()) {
            case 'a': return "🐴🐎";
            case 'b': return "🐎🐴🐴🐴";
            case 'c': return "🐎🐴🐎🐴";
            case 'd': return "🐎🐴🐴";
            case 'e': return "🐴";
            case 'f': return "🐴🐴🐎🐴";
            case 'g': return "🐎🐎🐴";
            case 'h': return "🐴🐴🐴🐴";
            case 'i': return "🐴🐴";
            case 'j': return "🐴🐎";
            case 'k': return "🐎🐴🐎";
            case 'l': return "🐴🐎🐴🐴";
            case 'm': return "🐎🐎";
            case 'n': return "🐎🐴";
            case 'o': return "🐎🐎🐎";
            case 'p': return "🐴🐎🐎🐴";
            case 'q': return "🐎🐎🐴🐎";
            case 'r': return "🐴🐎🐴";
            case 's': return "🐴🐴🐴";
            case 't': return "🐎";
            case 'u': return "🐴🐴🐎";
            case 'v': return "🐴🐴🐴🐎";
            case 'w': return "🐴🐎🐎";
            case 'x': return "🐎🐴🐴🐎";
            case 'y': return "🐎🐴🐎🐎";
            case 'z': return "🐎🐎🐴🐴";
            case ' ': return "/";
        }
        return "🦄";
    };

    this.revHorseMap = function(multiSymbol) {
        switch(multiSymbol){
            case "/": return ' ';
            case "🦄" : return '?';
            case "🐴🐎": return 'a';
            case "🐎🐴🐴🐴": return 'b';
            case "🐎🐴🐎🐴": return 'c';
            case "🐎🐴🐴": return 'd';
            case "🐴": return 'e';
            case "🐴🐴🐎🐴": return 'f';
            case "🐎🐎🐴": return 'g';
            case "🐴🐴🐴🐴": return 'h';
            case "🐴🐴": return 'i';
            case "🐴🐎": return 'j';
            case "🐎🐴🐎": return 'k';
            case "🐴🐎🐴🐴": return 'l';
            case "🐎🐎": return 'm';
            case "🐎🐴": return 'n';
            case "🐎🐎🐎": return 'o';
            case "🐴🐎🐎🐴": return 'p';
            case "🐎🐎🐴🐎": return 'q';
            case "🐴🐎🐴": return 'r';
            case "🐴🐴🐴": return 's';
            case "🐎": return 't';
            case "🐴🐴🐎": return 'u';
            case "🐴🐴🐴🐎": return 'v';
            case "🐴🐎🐎": return 'w';
            case "🐎🐴🐴🐎": return 'x';
            case "🐎🐴🐎🐎": return 'y';
            case "🐎🐎🐴🐴": return 'z';
        }
        return multiSymbol;
    };


    this.horse = function(ascii) {
        if(ascii != undefined && ascii != "") {
            return ascii
                .split('')
                //.map(String.toLowerCase)
                .map(this.horseMap)
                .reduce(function (current, previous) {
                    return current + " " + previous;
                });
        }
        return "";
    };

    this.ascii = function(horse) {
        if(horse != undefined && horse != "") {
            return horse
                .split(' ')
                .map(this.revHorseMap)
                .reduce(function(current, previous){
                    return current + previous;
                });
        }
        return "";
    };

    this.direction = this.horse;

    this.swap = function() {
        this.source = this.direction(this.source);
        if(this.direction == this.horse) {
            this.direction = this.ascii;
            this.sourceLabel = LABELS.HORSE;
            this.resultLabel = LABELS.TEXT;
        } else {
            this.direction = this.horse;
            this.sourceLabel = LABELS.TEXT;
            this.resultLabel = LABELS.HORSE;
        }
    };

}]);

