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
            onEnter: ['$state', 'authFact', function ($state, auth) {
            
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'library/register/register.html',
            controller: 'RegisterCtrl',
        })
        .state('login', {
            url: '/login',
            templateUrl: 'library/login/login.html',
            controller: 'NavCtrl',
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'library/administration/admin.html',
            controller: 'AdminCtrl'
        })
        .state('users', {
            url: '/admin/users',
            templateUrl: 'library/admin_users/adminUsers.html',
            controller : 'AdminUsersCtrl'
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
