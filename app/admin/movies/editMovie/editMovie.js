'use strict';

angular.module('myApp.editmovie', [
    'ngRoute',
    'myApp.moviesService',
    'myApp.userService'
])

    .controller('editCtrl', ['$scope', 'moviesService', 'userService', '$routeParams', '$location',
        function (sc, moviesService, userService, route, loc) {

            sc.movieId = route.param;
            sc.movie = {};

            moviesService.adminGetMovie(sc.movieId).then(function success(response) {
                if (!response.data.movieTransferObject) {
                    alertify.alert('No movie data');
                    loc.path('/admin/movies').search('page', 0);
                } else {
                    sc.movie = response.data.movieTransferObject;
                    sc.movie.releaseDate = new Date(response.data.movieTransferObject.releaseDate);
                    sc.users = response.data.users;
                    sc.reviews = makeReviews(response.data);
                    if (!response.data.reviews[0]) {
                        sc.noReviews = true;
                    }
                }
            }, function error(response) {
                alertify.alert(response.data.userMessage);
                loc.path('/movies');
            });

            sc.updMovie = function () {
                moviesService.updateMovie(sc.movieId, sc.movie).then(function success(response) {
                    var elem = angular.element(document.querySelector('#edit_result'))
                        .removeClass()
                        .empty()
                        .addClass('alert alert-success result_block')
                        .html('Movie updated');
                }, function error(response) {
                    var elem = angular.element(document.querySelector('#edit_result'))
                        .removeClass()
                        .empty()
                        .addClass('alert alert-danger result_block');
                    response.data.userMessage.forEach(m => {
                        elem.append(m + '</br>');
                    });
                });
            };

            sc.updateRating = function (movieId) {
                moviesService.updateMovieRating(movieId).then(function success(response) {
                    sc.movie.rating = response.data;
                    alertify.reset()
                        .maxLogItems(5)
                        .delay(2000)
                        .success('Rating updated');
                }, function error(response) {
                    alertify.alert(response.data.userMessage);
                });
            };

            sc.delReview = function (reviewId) {
                moviesService.deleteReview(reviewId).then(function success(response) {
                    alertify.reset()
                        .maxLogItems(5)
                        .delay(2000)
                        .success('Review deleted');
                    moviesService.getReviewsByMovie(sc.movieId).then(function success(response) {
                        sc.reviews = composeReviews(response.data, sc.users);
                    });
                }, function error(response) {
                    alertify.alert(response.data.userMessage);
                });
            };

            sc.ban = function (userId) {
                userService.banUser(userId).then(function success(response) {
                    var successMessage = bannedMessage(sc.users, userId);
                    alertify.reset()
                        .maxLogItems(5)
                        .delay(2000)
                        .success(successMessage);
                    sc.users = toggleBanned(sc.users, userId);
                    sc.reviews = composeReviews(sc.reviews, sc.users);
                }, function error(response) {
                    alertify.alert(response.data.userMessage);
                });
            };

        }]);

/**
 * Toggles specific user ban state
 * @param users users array
 * @param userId id of user to toggle ban state
 * @returns {*} updated users array or null if users array is null
 */
var toggleBanned = function (users, userId) {
    if (users == null) {
        return null;
    }
    users.forEach(u => {
        if (u.id == userId) {
            u.banned = u.banned != true;
        }
    });

    return users;
};

/**
 * Updates reviews info
 *
 * @param reviews reviews list to update
 * @param users users list
 * @returns {*} updated reviews array or null if either reviews or users is null
 */
var composeReviews = function (reviews, users) {
    if (reviews == null || users == null) {
        return null;
    }
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