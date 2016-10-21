'use strict';

angular.module('myApp.adminMovies', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/movies', {
            templateUrl: 'admin/movies/manageMovies.html',
            controller: 'manageCtrl'
        });
    }])

    .controller('manageCtrl', ['$scope', '$http', '$location', function (sc, http, loc) {

        sc.movies = {};
        sc.noMovies = false;

        var search = loc.search();
        sc.page = search.page || 0;
        sc.goEditMovie = function (movieId) {
            loc.path('/admin/movies/' + movieId).search();
        };
        sc.updateRating = function (movieId) {
            http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/managemovies',
                params: {movieId: movieId}
            }).then(function success(response) {
                alert("OK");
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        http({
            method: 'GET',
            url: 'http://localhost:8080/admin/managemovies?page=' + sc.page
        }).then(function success(response) {
            if (!response.data.content[0]) {
                sc.noMovies = true;
            } else {
                sc.movies = response.data.content;
                sc.numberOfPages = response.data.totalPages;
                sc.notFirst = !response.data.first;
                sc.notLast = !response.data.last;
            }
        }, function error(response) {
            alert(response.data.userMessage);
            loc.path('/admin/movies').search('page', 0);
        });


        sc.goFirst = function () {
            loc.path('/admin/movies').search('page', 0);
        };
        sc.prev = function () {
            loc.path('/admin/movies').search('page', parseInt(sc.page) - 1);
        };
        sc.next = function () {
            loc.path('/admin/movies').search('page', parseInt(sc.page) + 1);
        };
        sc.goLast = function () {
            loc.path('/admin/movies').search('page', sc.numberOfPages - 1);
        };
        sc.goToPage = function (pageToGo) {
            loc.path('/admin/movies').search('page', pageToGo);
        }

    }]);