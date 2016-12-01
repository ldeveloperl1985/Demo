
var app = angular.module('myDemoApp', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'home.html'
    }).
    when('/customer', {
        templateUrl: 'customer.html'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);