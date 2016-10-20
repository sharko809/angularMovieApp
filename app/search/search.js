'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'searchCtrl'
        });
    }])

    .controller('searchCtrl', ['$scope', '$location', '$http', function (sc, loc, http) {

        sc.movies = {};
        sc.noMovies = false;

        var search = loc.search();
        sc.movieName = search.t;
        sc.page = search.page || 0;
        sc.notFirst = false;
        sc.notLast = false;
        sc.numberOfPages = 1;

        if (sc.movieName === '' || sc.movieName === ' ') {
            sc.noMovies = true;
        } else {
            http({
                method: 'GET',
                url: 'http://localhost:8080/search?t=' + sc.movieName + '&page=' + sc.page
            }).then(function successCallback(response) {
                if (!response.data.content[0]) {
                    sc.noMovies = true;
                } else {
                    sc.movies = response.data.content;
                    sc.numberOfPages = response.data.totalPages;
                    sc.notFirst = !response.data.first;
                    sc.notLast = !response.data.last;
                }
            }, function errorCallback(response) {
                alert(response.data.userMessage);
                loc.path('/search').search('t', sc.movieName).search('page', 0);
            });
        }

        sc.goFirst = function () {
            loc.path('/search').search('t', sc.movieName).search('page', 0);
        };
        sc.prev = function () {
            loc.path('/search').search('t', sc.movieName).search('page', parseInt(sc.page) - 1);
        };
        sc.next = function () {
            loc.path('/search').search('t', sc.movieName).search('page', parseInt(sc.page) + 1);
        };
        sc.goLast = function () {
            loc.path('/search').search('t', sc.movieName).search('page', sc.numberOfPages - 1);
        };
        sc.goToPage = function (pageToGo) {
            loc.path('/search').search('t', sc.movieName).search('page', pageToGo);
        }

    }]);