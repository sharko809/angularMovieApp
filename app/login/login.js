'use strict';

angular.module('myApp.login', [
    'ngRoute',
    'myApp.loginService',
    'cookieService'
])

    .controller('loginCtrl', ['$scope', 'loginService', 'cookieService', function (sc, service, cookieService) {

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
                console.log(response); // TODO remove
            }, function errorCallback(response) {
                console.log(response);// TODO remove
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