'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'searchCtrl'
        });
    }])

    .controller('searchCtrl', ['$scope', '$location', function (sc, loc) {

        sc.movies = {};

        // http({
        //     method: 'GET',
        //     url: 'http://localhost:8080/search?t=' + sc.searchInput.query
        // }).then(function successCallback(response) {
        //     console.log(response);
        //     sc.movies = response.data;
        // }, function errorCallback(response) {
        //
        // });

        // TODO send get

    }]);