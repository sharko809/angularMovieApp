'use strict';

angular.module('myApp.moviesService', [])

    .factory('moviesService', ['$http', function ($http) {

        var factory = {};

        /**
         * Get movies by pages
         * @param page page of movies list
         * @returns {*} promise from $http service. Response should contain an array of movie objects
         */
        factory.getMovies = function (page) {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/movies',
                params: {page: page}
            })
        };

        /**
         * Performs get request with movie title as a query parameter
         * @param movieName movie title
         * @param page page of found movies list
         * @returns {*} promise from $http service. Response should contain an array of movie objects
         */
        factory.performSearch = function (movieName, page) {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/search',
                params: {t: movieName, page: page}
            })
        };

        /**
         * Get list of 10 movies with top ratings
         * @returns {*} promise from $http service. Response should contain an array of movie objects
         */
        factory.getTopRated = function () {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/movies/top'
            })
        };

        /**
         * Get data for particular movie
         * @param movieId id of movie which data is to be retrieved
         * @returns {*}
         */
        factory.getMovieData = function (movieId) {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/movies/' + movieId
            })
        };

        /**
         * Makes POST request to the server with review data
         * @param movieId id of the movie for which review is submitted
         * @param review review data
         * @returns {*} promise from $http service
         */
        factory.postReview = function (movieId, review) {
            return $http({
                method: 'POST',
                url: 'https://localhost:8443/movies/' + movieId + '/post',
                data: review
            })
        };

        /**
         * Add new movie
         * @param movie movie to be added
         * @returns {*} promise from $http service
         */
        factory.addMovie = function (movie) {
            return $http({
                method: 'POST',
                url: 'https://localhost:8443/admin/addmovie',
                data: movie
            })
        };

        /**
         * Get movies by pages
         * @param page page of movies list
         * @returns {*} promise from $http service. Response should contain an array of movie objects
         */
        factory.adminMovies = function (page) {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/admin/managemovies',
                params: {page: page}
            })
        };

        /**
         * Updates movie rating
         * @param movieId id of movie which rating to update
         * @returns {*} promise from $http service
         */
        factory.updateMovieRating = function (movieId) {
            return $http({
                method: 'PUT',
                url: 'https://localhost:8443/admin/managemovies',
                params: {movieId: movieId}
            })
        };

        /**
         * Get data for particular movie
         * @param movieId id of movie which data is to be retrieved
         * @returns {*} promise from $http service
         */
        factory.adminGetMovie = function (movieId) {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/admin/managemovies/' + movieId
            })
        };

        /**
         * Updates movie data on the server
         * @param movieId id of movie to update
         * @param movie updated movie data
         * @returns {*} promise from $http service
         */
        factory.updateMovie = function (movieId, movie) {
            return $http({
                method: 'PUT',
                url: 'https://localhost:8443/admin/managemovies/' + movieId,
                data: movie
            })
        };

        /**
         * Deletes review
         * @param reviewId id of review to delete
         * @returns {*} promise from $http service
         */
        factory.deleteReview = function (reviewId) {
            return $http({
                method: 'DELETE',
                url: 'https://localhost:8443/admin/delreview',
                params: {reviewId: reviewId}
            })
        };

        return factory;

    }]);