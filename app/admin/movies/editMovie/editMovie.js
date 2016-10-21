'use strict';

angular.module('myApp.editmovie', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/movies/:param', {
            templateUrl: 'admin/movies/editMovie/editMovie.html',
            controller: 'editCtrl'
        });
    }])

    .controller('editCtrl', ['$scope', '$http', '$routeParams', '$location', function (sc, http, route, loc) {

        sc.movieId = route.param;
        sc.movie = {};

        http({
            method: 'GET',
            url: 'http://localhost:8080/admin/managemovies/' + sc.movieId
        }).then(function success(response) {
            if (!response.data.movieTransferObject) {
                alert('No movie data');
                loc.path('/admin/movies').search('page', 0);
            } else {
                // TODO release date format issue
                sc.movie = response.data.movieTransferObject;
                sc.reviews = makeReviews(response.data);
            }
        }, function error(response) {
            console.log(response.data);
            alert(response.data.userMessage);
        });

        sc.updateMovie = function () {
            http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/managemovies/' + sc.movieId,
                data: sc.movie
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
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

        sc.deleteReview = function (reviewId) {
            http({
                method: 'DELETE',
                url: 'http://localhost:8080/admin/delreview',
                params: {reviewId: reviewId}
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        sc.ban = function (userId) {
            http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/ban',
                params: {userId: userId}
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

    }]);