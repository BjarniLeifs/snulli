app.controller('AdminUsersCtrl', ['$scope', '$state', 'adminUsersFact', '$stateParams', '$location', '$timeout', '$window',
    function ($scope, $state, adminUsersFact, $stateParams, $location, $timeout, $window)  {
		
		adminUsersFact.getUsers().then(function (response) {
			$scope.users = response.data;
		});


    }
]);