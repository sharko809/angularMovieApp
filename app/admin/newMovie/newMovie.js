'use strict';

angular.module('myApp.newmovie', [
    'ngRoute',
    'myApp.moviesService',
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/addmovie', {
            templateUrl: 'admin/newMovie/newMovie.html',
            controller: 'newmovieCtrl'
        });
    }])

    .controller('newmovieCtrl', ['$scope', 'moviesService', function (sc, moviesService) {

        sc.movie = {};

        sc.addMovie = function () {
            moviesService.addMovie(sc.movie).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

    }]);