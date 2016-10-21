'use strict';

angular.module('myApp.movies', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movies', {
            templateUrl: 'movies/movies.html',
            controller: 'moviesCtrl'
        });
    }])

    .controller('moviesCtrl', ['$scope', '$http', '$location', function (sc, http, loc) {

        sc.movies = {};
        sc.noMovies = false;

        var search = loc.search();
        sc.page = search.page || 0;

        http({
            method: 'GET',
            url: 'http://localhost:8080/movies?page=' + sc.page
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
            loc.path('/movies').search('page', 0);
        });

        sc.goFirst = function () {
            loc.path('/movies').search('page', 0);
        };
        sc.prev = function () {
            loc.path('/movies').search('page', parseInt(sc.page) - 1);
        };
        sc.next = function () {
            loc.path('/movies').search('page', parseInt(sc.page) + 1);
        };
        sc.goLast = function () {
            loc.path('/movies').search('page', sc.numberOfPages - 1);
        };
        sc.goToPage = function (pageToGo) {
            loc.path('/movies').search('page', pageToGo);
        };

    }]);