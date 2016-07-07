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
    auth.isAdmin = function() {
  
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        var scopes = payload.scopes;
        for (var i = 0; i < scopes.length; i++) {
            if (scopes[i] === 'admin') {
                return true;
            }
        }
        return false;

    };
    auth.isMod = function() {
   
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        var scopes = payload.scopes;
        for (var i = 0; i < scopes.length; i++) {
            if (scopes[i] === 'moderator' || scopes[i] === 'admin') {
                return true;
            }
        }
        return false;

    };
    auth.isWriter = function() {

        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        var scopes = payload.scopes;
        for (var i = 0; i < scopes.length; i++) {
            if (scopes[i] === 'moderator' || scopes[i] ==='admin' || scopes[i] === 'writer') {
                return true;
            }
        }
        return false;

    };
    auth.currentUser = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };
    auth.currentUserId = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.id;
        }
    };
    auth.currentName = function() {
  
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.name;

    };
    auth.imageurl = function () {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.imageurl;
        }
    };

    auth.register = function (user) {
        $http.post('/register', user).success(function (data) {

        });
    };

    auth.logIn = function (user) {
        return $http.post('/login', user).success(function (data) {
            auth.saveToken(data.token);
        });
    };


    auth.logOut = function () {
        $window.localStorage.removeItem('appToken');
        $location.path('/login');
    };

    auth.resetPassword = function (email) {
        var returnMe;
        var object = {
            email: email
        };
        $http.post('/forgotPassword', {  email: email }).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    auth.newPassword = function (object) {
        var returnMe;
        $http.post('/reset/'+object.token, object).success(function (data) {
            angular.copy(data, returnMe);
        });
        return returnMe;
    };
    return auth;
}]);