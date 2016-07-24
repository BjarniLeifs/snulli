
app.factory('adminUsersFact', ['$http', '$window', '$location', function ($http, $window, $location) {
    return {
        getUsers: function () {
            return $http.get('/admin/users');
            
        },

    }

}]);