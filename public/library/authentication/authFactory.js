//* AuthenticationFactory */

app.factory('auth', ['$http', '$window', '$location', function ($http, $window, $location) {
    var auth = {};

    auth.saveToken = function (token) {
        $window.localStorage['appToken'] = token;
    };

    auth.getToken = function () {
        return $window.localStorage['appToken'];
    };

    auth.isLoggedIn = function () {
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob( token.split('.')[1]) );

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.register = function (user) {
        return $http.post('/auth/register', user).success(function (data) {

        });
    };

    auth.logIn = function (user) {
        return $http.post('/auth/login', user).success(function (data) {
            auth.saveToken(data.token);
        });
    };


    auth.logOut = function () {
        $window.localStorage.removeItem('appToken');
        $location.path('/home');
    };

    auth.resetPassword = function (email) {
        var returnMe;
        var object = {
            email: email
        };
        $http.post('/auth/forgotPassword', {  email: email }).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    auth.newPassword = function (object) {
        var returnMe;
        $http.post('/auth/reset/'+object.token, object).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    return auth;
}]);