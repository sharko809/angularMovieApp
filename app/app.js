'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.movies',
    'myApp.movie',
    'myApp.toprated',
    'myApp.search',
    'myApp.admin',
    'myApp.newmovie',
    'myApp.newuser',
    'myApp.adminMovies',
    'myApp.editmovie',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/login'});
}])

    .controller('mainCtrl', ['$scope', '$http', '$location', function (sc, http, loc) {

        sc.searchInput = {};

        sc.search = function () {
            loc.path('/search').search('t', sc.searchInput.query);
        };

    }])

    .filter('pages', function () {
        return function (input, currentPage, totalPages, range) {
            currentPage = parseInt(currentPage);
            totalPages = parseInt(totalPages);
            range = parseInt(range);

            var minPage = (currentPage - range < 0) ? 0 :
                (currentPage - range > (totalPages - (range * 2))) ? totalPages - (range * 2) : currentPage - range;
            var maxPage = (currentPage + range > totalPages) ? totalPages :
                (currentPage + range < range * 2) ? range * 2 : currentPage + range;

            for (var i = minPage; i < maxPage; i++) {
                input.push(i);
            }

            return input;
        };
    });
