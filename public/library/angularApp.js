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
