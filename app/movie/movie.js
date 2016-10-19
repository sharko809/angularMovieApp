'use strict';

angular.module('myApp.movie', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movies/:param', {
            templateUrl: 'movie/movie.html',
            controller: 'movieCtrl'
        });
    }])

    .controller('movieCtrl', ['$scope', '$http', '$routeParams', function (sc, http, route) {

        sc.movieId = route.param;
        sc.movie = {};
        sc.reviews = {};

        http({
            method: 'GET',
            url: 'http://localhost:8080/movies/' + sc.movieId
        }).then(function success(response) {
            // TODO no movies logic
            console.log(response);
            sc.movie = response.data.movieTransferObject;
            sc.reviews = makeReviews(response.data);
        }, function error(response) {
            console.log(response);
        });

        var makeReviews = function (data) {
            var reviews = data.reviews;
            var users = data.users;
            var result = {};

            reviews.forEach(r => {
                users.forEach(u => {
                    if (u.id == r.userId) r.userName = u.name;
                });
            });

            return reviews;
        };

    }]);