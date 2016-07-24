
app.factory('users', ['$http', '$window', '$location', function ($http, $window, $location) {
    return {
        getUsers: function () {
            return $http.post('/auth/register', user).success(function (data) {
            });
        },
        isLoggedIn: function () {
            var token = $window.localStorage['appToken'];

            if (token) {
                var payload = JSON.parse($window.atob( token.split('.')[1]) );

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }
    }

}]);