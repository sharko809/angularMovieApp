'use strict';

angular.module('myApp.login', [
    'myApp.loginService',
    'cookieService'
])

    .controller('loginCtrl', ['$scope', 'loginService', 'cookieService', '$location', '$rootScope',
        function (sc, service, cookieService, $location, $rootScope) {

        sc.performLogin = function () {
            service.login(sc.user).then(function successCallback(response) {
                angular.element(document.querySelector('#login')).val('');
                angular.element(document.querySelector('#password')).val('');
                sc.loginForm.$invalid = true;
                service.setAuthHeader(response.data);
                cookieService.putTokenCookie(response.data);
                var elem = angular.element(document.querySelector('#log_result'));
                elem.removeClass()
                    .empty()
                    .addClass('alert alert-success')
                    .html('Login successful');
                $rootScope.is_user_logged_in = true;
                service.isAdmin().then(function success() {
                    $rootScope.is_user_admin = true;
                }, function error() {
                    $rootScope.is_user_admin = false;
                });
                $location.path("/movies");
            }, function errorCallback(response) {
                var elem = angular.element(document.querySelector('#log_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-danger');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                });
            });
        };

    }]);