/* Angular routing and app declaration */

var app = angular.module('myApp', ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'library/navigation/navMain.html',
            controller: 'NavCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {

            }]
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'library/authentication/register.html',
            controller: 'AuthCtrl',

        })
        /*
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/forgotpassword.html',
            controller: 'AuthCtrl',
        })
        */
    


        $urlRouterProvider.otherwise('home');
    }
]);
