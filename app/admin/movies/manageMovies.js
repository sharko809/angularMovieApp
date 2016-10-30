'use strict';

angular.module('myApp.adminMovies', [
    'ngRoute',
    'myApp.moviesService'
])

    .controller('manageCtrl', ['$scope', 'moviesService', '$location', function (sc, moviesService, loc) {

        sc.movies = {};
        sc.noMovies = false;

        var search = loc.search();
        sc.page = search.page || 0;

        sc.updateRating = function (movieId) {
            moviesService.updateMovieRating(movieId).then(function success(response) {
                alertify.reset()
                    .maxLogItems(5)
                    .delay(2000)
                    .success('Rating updated');
                sc.movies = redrawRating(sc.movies, movieId, response.data);
            }, function error(response) {
                alertify.alert(response.data.userMessage);
            });
        };

        moviesService.adminMovies(sc.page).then(function success(response) {
            if (!response.data.content[0]) {
                sc.noMovies = true;
            } else {
                sc.movies = response.data.content;
                sc.numberOfPages = response.data.totalPages;
                sc.notFirst = !response.data.first;
                sc.notLast = !response.data.last;
            }
        }, function error(response) {
            alertify.alert(response.data.userMessage);
            loc.path('/admin/movies').search('page', 0);
        });


        sc.goFirst = function () {
            loc.path('/admin/movies').search('page', 0);
        };
        sc.prev = function () {
            loc.path('/admin/movies').search('page', parseInt(sc.page) - 1);
        };
        sc.next = function () {
            loc.path('/admin/movies').search('page', parseInt(sc.page) + 1);
        };
        sc.goLast = function () {
            loc.path('/admin/movies').search('page', sc.numberOfPages - 1);
        };
        sc.goToPage = function (pageToGo) {
            loc.path('/admin/movies').search('page', pageToGo);
        }

    }]);

/**
 * Updates displayed rating of the movie specified by id
 * @param movies movies list
 * @param movieId movie id to update rating
 * @param newRating new movie rating
 * @returns {*} list of updated movies
 */
var redrawRating = function (movies, movieId, newRating) {
    if (movies == null || movieId == null || newRating == null) {
        return null;
    }
    movies.forEach(m => {
        if (m.id == movieId) {
            m.rating = newRating;
        }
    });

    return movies;
};