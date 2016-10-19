'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.movies',
    'myApp.movie',
    'myApp.toprated',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/login'});
}])

    .controller('mainCtrl', ['$scope', '$http', '$location', function (sc, http, loc) {

        sc.searchInput = {};

        sc.search = function () {
            // TODO redirect to search page
        };

    }]);
