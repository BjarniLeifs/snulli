//* AuthenticationFactory */

app.factory('auth', ['$http', '$window', '$location', function ($http, $window, $location) {
    return {
        getToken: function () {
            return $window.localStorage['appToken'];
        },
        isLoggedIn: function () {
            var token = getToken();

            if(token){
                var payload = JSON.parse($window.atob( token.split('.')[1]) );

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        },
        register: function (user) {
            return $http.post('/auth/register', user).success(function (data) {
            });
        },
        logIn: function (user) {
            return $http.post('/auth/login', user).success(function (data) {
                $window.localStorage['appToken'] = data.token;
            });
        },
        logOut: function () {
            $window.localStorage.removeItem('appToken');
            $location.path('/home');
        },
        resetPassword: function (email) {
            var returnMe;
            var object = {
                email: email
            };
            $http.post('/auth/forgotPassword', {  email: email }).success(function (data) {
                angular.copy(data, returnMe);
            });
            return returnMe;
        },
        newPassword: function (object) {
            var returnMe;
            $http.post('/auth/reset/'+object.token, object).success(function (data) {
                angular.copy(data, returnMe);
            });
            return returnMe;
        }
    }

}]);