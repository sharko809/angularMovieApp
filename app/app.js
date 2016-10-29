'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.movies',
    'myApp.movie',
    'myApp.toprated',
    'myApp.search',
    'myApp.admin',
    'myApp.newmovie',
    'myApp.newuser',
    'myApp.adminMovies',
    'myApp.editmovie',
    'myApp.users',
    'myApp.account',
    'myApp.logoutService',
    'registration',
    'cookieService',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');

    for (var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider.otherwise({redirectTo: '/movies'});
}])

    .controller('mainCtrl', ['$scope', '$location', 'logoutService', function (sc, loc, logoutService) {

        sc.searchInput = {};

        sc.search = function () {
            loc.path('/search').search('t', sc.searchInput.query);
            sc.searchInput.query = '';
        };

        sc.performLogout = function () {
            logoutService.logout();
        }

    }])

    .filter('pages', function () {
        /**
         * Simple pagination filter. Generates page numbers according to their total amount.
         * @param input this value is to be returned
         * @param currentPage current page (zero based)
         * @param numberOfPages total number of pages
         */
        return function (input, currentPage, numberOfPages) {
            var page = parseInt(currentPage);
            var total = parseInt(numberOfPages);

            var minPage = (total > 10) ? (page > 5 ? (page - 5) : 0) : 0;
            var maxPage = (total > 10) ? ((page + 5) > total ? total : (page + 5)) : total;

            for (var i = minPage; i < maxPage; i++) {
                input.push(i);
            }

            return input;
        };
    })
    .run(['cookieService', 'loginService', '$rootScope', function (cookieService, loginService, $rootScope) {

        var authCookie = cookieService.getCookie('user_auth_cookie');
        if (authCookie != null || authCookie != undefined) {
            loginService.setAuthHeader(authCookie);
        }

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            for (var path in window.routes) {
                if (next.indexOf(path) != -1) {
                    if (window.routes[path].requireLogin && !cookieService.authExists()) {
                        alert('Authentication required to access this page');
                        event.preventDefault();
                        // TODO redirect
                    } else {
                        if (window.routes[path].requireLogin && window.routes[path].requireAdmin &&
                            (!cookieService.authExists() || !loginService.isAdmin()) ) {
                            alert('You do not have access to this page');
                            event.preventDefault();
                        }
                    }
                }
            }
        });

    }]);

window.routes = {
    "/top": {
        templateUrl: 'toprated/toprated.html',
        controller: 'topCtrl',
        requireLogin: false,
        requireAdmin: false
    },
    "/account": {
        templateUrl: 'account/account.html',
        controller: 'accountCtrl',
        requireLogin: true,
        requireAdmin: false
    },
    "/login": {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl',
        requireLogin: false,
        requireAdmin: true
    },
    "/search": {
        templateUrl: 'search/search.html',
        controller: 'searchCtrl',
        requireLogin: false,
        requireAdmin: false
    },
    "/registration": {
        templateUrl: 'registration/registration.html',
        controller: 'regCtrl',
        requireLogin: false,
        requireAdmin: false
    },
    "/movies": {
        templateUrl: 'movies/movies.html',
        controller: 'moviesCtrl',
        requireLogin: false,
        requireAdmin: false
    },
    "/movies/:param": {
        templateUrl: 'movie/movie.html',
        controller: 'movieCtrl',
        requireLogin: false,
        requireAdmin: false
    },
    "/admin/users": {
        templateUrl: 'admin/users/users.html',
        controller: 'usersCtrl',
        requireLogin: true,
        requireAdmin: true
    },
    "/admin/newuser": {
        templateUrl: 'admin/newUser/newUser.html',
        controller: 'newuserCtrl',
        requireLogin: true,
        requireAdmin: true
    },
    "/admin/addmovie": {
        templateUrl: 'admin/newMovie/newMovie.html',
        controller: 'newmovieCtrl',
        requireLogin: true,
        requireAdmin: true
    },
    "/admin/movies": {
        templateUrl: 'admin/movies/manageMovies.html',
        controller: 'manageCtrl',
        requireLogin: true,
        requireAdmin: true
    },
    "/admin/movies/:param": {
        templateUrl: 'admin/movies/editMovie/editMovie.html',
        controller: 'editCtrl',
        requireLogin: true,
        requireAdmin: true
    }
};
