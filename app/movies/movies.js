'use strict';

angular.module('myApp.movies', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movies', {
            templateUrl: 'movies/movies.html',
            controller: 'moviesCtrl'
        });
    }])

    .controller('moviesCtrl', ['$scope', '$http', function (sc, http) {

        sc.movies = {};

        http({
            method: 'GET',
            url: 'http://localhost:8080/movies'
        }).then(function successCallback(response) {
            if (response.data == null || !response.data.content) {
                sc.movies = 'No movies found';
            } else {
                sc.movies = response.data.content;
            }
            // logic
        }, function errorCallback(response) {
            //logic
        });

    }]);