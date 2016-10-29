'use strict';

angular.module('myApp.movie', [
    'ngRoute',
    'myApp.moviesService'
])

    .controller('movieCtrl', ['$scope', '$routeParams', 'moviesService', function (sc, route, service) {

        sc.movieId = route.param;
        sc.movie = {};
        sc.reviews = {};
        sc.generateRating = ratingArray();
        sc.submitted = false;

        service.getMovieData(sc.movieId).then(function success(response) {
            // TODO no movies logic
            sc.movie = response.data.movieTransferObject;
            sc.reviews = makeReviews(response.data);
            if (!response.data.reviews[0]) {
                sc.noReviews = true;
            }
        }, function error(response) {
            console.log(response);
            alert(response.data.userMessage);
        });

        sc.review = {};

        sc.postReview = function () {
            // if (sc.reviewForm.$invalid) {
            //     sc.submitted = true;
            //     return;
            // }
            // TODO keep in mind - this is authorized users feature
            service.postReview(sc.movieId, sc.review).then(function success(response) {
                sc.movie = response.data.movieTransferObject;
                sc.reviews = makeReviews(response.data);
                if (!response.data.reviews[0]) {
                    sc.noReviews = true;
                }
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
            if (u.id == r.userId) {
                r.userName = u.name;
                r.banned = u.banned == true;
            }
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