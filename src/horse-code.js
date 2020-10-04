var horseCodeModule = angular.module('horseCode', []);

horseCodeModule.constant("LABELS", {
    "TEXT" : "Text",
    "HORSE": "Horse Code"
});

horseCodeModule.controller("horseController",['LABELS', function(LABELS) {
    this.source;
    this.sourceLabel = LABELS.TEXT;
    this.resultLabel = LABELS.HORSE;


}]);

