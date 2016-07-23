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
            templateUrl: 'library/register/register.html',
            controller: 'RegisterCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {

            }]

        }).
        state('home.login', {
            url: '/login',
            templateUrl: 'library/login/login.html',
            controller: 'LoginCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {

            }]
        });
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
