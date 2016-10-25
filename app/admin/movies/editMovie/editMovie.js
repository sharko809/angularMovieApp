'use strict';

angular.module('myApp.editmovie', [
    'ngRoute',
    'myApp.moviesService',
    'myApp.userService'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/movies/:param', {
            templateUrl: 'admin/movies/editMovie/editMovie.html',
            controller: 'editCtrl'
        });
    }])

    .controller('editCtrl', ['$scope', 'moviesService', 'userService', '$routeParams', '$location',
        function (sc, moviesService, userService, route, loc) {

        sc.movieId = route.param;
        sc.movie = {};

        moviesService.adminGetMovie(sc.movieId).then(function success(response) {
            if (!response.data.movieTransferObject) {
                alert('No movie data');
                loc.path('/admin/movies').search('page', 0);
            } else {
                // TODO release date format issue
                sc.movie = response.data.movieTransferObject;
                sc.reviews = makeReviews(response.data);
                if (!response.data.reviews[0]) {
                    sc.noReviews = true;
                }
            }
        }, function error(response) {
            console.log(response.data);
            alert(response.data.userMessage);
        });

        sc.updMovie = function () {
            moviesService.updateMovie(sc.movieId, sc.movie).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        sc.updateRating = function (movieId) {
            moviesService.updateMovieRating(movieId).then(function success(response) {
                alert("OK");
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        sc.delReview = function (reviewId) {
            moviesService.deleteReview(reviewId).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        sc.ban = function (userId) {
            userService.banUser(userId).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

    }]);