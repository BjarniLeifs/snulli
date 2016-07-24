
app.factory('usersFact', ['$http', '$window', '$location', function ($http, $window, $location) {
    return {
        getUsers: function () {
            return $http.get('/admin/users', user).success(function (data) {
            });
        },

    }

}]);