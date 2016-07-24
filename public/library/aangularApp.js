/* Angular routing and app declaration */

var app = angular.module('myApp', ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'library/home/home.html',
            controller: 'HomeCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {
            
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'library/register/register.html',
            controller: 'RegisterCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {

            }]

        })
        .state('login', {
            url: '/login',
            templateUrl: 'library/login/login.html',
            controller: 'NavCtrl',
            onEnter: ['$state', 'auth', function ($state, auth) {

            }]
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'library/administration/admin.html',
            controller: 'AdminCtrl'
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: 'library/users/users.html',
            controller : 'UsersCtrl'
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
