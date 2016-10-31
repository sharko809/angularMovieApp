'use strict';

angular.module('myApp.movie', ['myApp.moviesService'])

    .controller('movieCtrl', ['$scope', '$routeParams', 'moviesService', function (sc, route, service) {

        var vm = this;
        vm.movieId = route.param;
        vm.movie = {};
        vm.reviews = {};
        vm.generateRating = ratingArray();
        vm.submitted = false;

        service.getMovieData(vm.movieId).then(function success(response) {
            vm.movie = response.data.movieTransferObject;
            vm.reviews = makeReviews(response.data);
            if (!response.data.reviews[0]) {
                vm.noReviews = true;
            }
        }, function error(response) {
            alertify.alert(response.data.userMessage);
        });

        vm.review = {};

        vm.postReview = function () {
            service.postReview(vm.movieId, vm.review).then(function success(response) {
                vm.movie = response.data.movieTransferObject;
                vm.reviews = makeReviews(response.data);
                if (!response.data.reviews[0]) {
                    vm.noReviews = true;
                }
                alertify.reset()
                    .maxLogItems(3)
                    .delay(3000)
                    .success('Review submitted');
                var elem = angular.element(document.querySelector('#post_result'))
                    .removeClass()
                    .empty();
                angular.element(document.querySelector('#rTitle')).val('');
                angular.element(document.querySelector('#rText')).val('');
                angular.element(document.querySelector('#rRating')).val('');
                document.getElementById('post_butt').disabled = true
            }, function error(response) {
                var elem = angular.element(document.querySelector('#post_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-danger result_block');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                });
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