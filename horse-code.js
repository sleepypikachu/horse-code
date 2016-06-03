var horseCodeModule = angular.module('horseCode', []);

horseCodeModule.filter('greet', function() {
    return function(name) {
        return 'Hello, ' + name + '!';
    };
});
