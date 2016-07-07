/*! Made on 07-07-2016 */
/* Angular routing and app declaration */

var app = angular.module('myApp', ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'library/components/navigation/navMain.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {
                if (!auth.isLoggedIn()) {
                    //$state.go('login');
                } 

            }]
        })
        /*.state('login', {
            url: '/login',
            templateUrl: 'views/partial/authenticate/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {
               if (auth.isLoggedIn()) {
                    $state.go('home');
               }
            }]
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/forgotpassword.html',
            controller: 'AuthCtrl',
        })
        */
        .state('test', {
            url: '/views',
            templateUrl: 'views/error.html',
            controller: 'AuthCtrl',

        });


        $urlRouterProvider.otherwise('home');
    }
]);

/* AuthController*/

app.controller('AuthCtrl', ['$scope', '$state', 'auth', '$stateParams', '$location', '$timeout',
    function ($scope, $state, auth, $stateParams, $location, $timeout) {

        

        
}]);
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
/* AuthInterceptorFactory */
/* Used to store token with all request to api for authentication */

app.factory('authInterceptor', function ($rootScope, $q, $window) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.localStorage['appToken']) {
				config.headers.Authorization = 'Bearer ' +  $window.localStorage['appToken'];
			}
			return config;
		},
		response: function (response) {
			if (response.status === 401) {
				/* Handle the case where user is not authenticated */
			}
			return response || $q.when(response);
		}
	};
});
/* NavController */
app.controller('NavCtrl', ['$scope', 'auth',
    function ($scope, auth) {

      
     

    }
]);