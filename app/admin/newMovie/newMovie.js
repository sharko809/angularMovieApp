'use strict';

angular.module('myApp.newmovie', [
    'ngRoute',
    'myApp.moviesService',
])

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