'use strict';

angular.module('myApp.newmovie', [
    'ngRoute',
    'myApp.moviesService',
])

    .controller('newmovieCtrl', ['$scope', 'moviesService', function (sc, moviesService) {

        sc.movie = {};

        sc.addMovie = function () {
            moviesService.addMovie(sc.movie).then(function success(response) {
                var elem = angular.element(document.querySelector('#add_result'));
                elem.removeClass()
                    .empty()
                    .addClass('alert alert-success result-block')
                    .html(response.data);
                sc.movie = {};
            }, function error(response) {
                var elem = angular.element(document.querySelector('#add_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-danger result_block');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                });
            });
        };

    }]);