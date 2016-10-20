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
        sc.generateRating = ratingArray();

        http({
            method: 'GET',
            url: 'http://localhost:8080/movies/' + sc.movieId
        }).then(function success(response) {
            // TODO no movies logic
            sc.movie = response.data.movieTransferObject;
            sc.reviews = makeReviews(response.data);
        }, function error(response) {
            console.log(response);
            alert(response.data.userMessage);
        });

        sc.review = {};

        /**
         * Makes POST request with review data attempting to add review to database
         */
        sc.postReview = function () {
            // TODO keep in mind - this is authorized users feature
            http({
                method: 'POST',
                url: 'http://localhost:8080/movies/' + sc.movieId + '/post',
                data: sc.review
            }).then(function success(response) {
                console.log("response: " + response);
                alert("Review submitted");
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        }

    }]);

/**
 * Associates review with user who posted it
 *
 * @param data response from the server containing movie, reviews and users data
 * @returns reviews array
 */
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

/**
 * Just creates an array of 10 elements to use in ng-repeat for generating rating values
 *
 * @returns {Array}
 */
var ratingArray = function () {
    return new Array(10);
};