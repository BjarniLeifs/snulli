app.controller('UsersCtrl', ['$scope', '$state', 'usersFact', '$stateParams', '$location', '$timeout', '$window',
    function ($scope, $state, usersFact, $stateParams, $location, $timeout, $window)  {
		
		$scope.users = usersFact.getUsers();

    }
]);