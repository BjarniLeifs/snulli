app.controller('LoginCtrl', ['$scope', '$state', 'auth', '$stateParams', '$location', '$timeout',
    function ($scope, $state, auth, $stateParams, $location, $timeout) {

		$scope.logIn = function () {
			auth.logIn(
				{
    				username : $scope.username,
    				password : $scope.password
    			}
    		).error(function (error) {
				$scope.error = error;
				$timeout(function() { $scope.error = false; }, 1000);
			}).then(function () {
				$timeout(function() { $state.go('home'); }, 5);
			});
			

		
		};

    }
]);