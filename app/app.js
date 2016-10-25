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
    'myApp.users',
    'myApp.account',
    'myApp.logoutService',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/login'});
}])

    .controller('mainCtrl', ['$scope', '$location', 'logoutService', function (sc, loc, logoutService) {

        sc.searchInput = {};

        sc.search = function () {
            loc.path('/search').search('t', sc.searchInput.query);
        };

        sc.performLogout = function() {
            logoutService.logout();
        }

    }])

    .filter('pages', function () {
        /**
         * Simple pagination filter. Generates page numbers according to their total amount.
         * @param input this value is to be returned
         * @param currentPage current page (zero based)
         * @param numberOfPages total number of pages
         */
        return function (input, currentPage, numberOfPages) {
            var page = parseInt(currentPage);
            var total = parseInt(numberOfPages);

            var minPage = (total > 10) ? (page > 5 ? (page - 5) : 0) : 0;
            var maxPage = (total > 10) ? ((page + 5) > total ? total : (page + 5)) : total;

            for (var i = minPage; i < maxPage; i++) {
                input.push(i);
            }

            return input;
        };
    });
