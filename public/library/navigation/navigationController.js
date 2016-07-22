/* NavController */
app.controller('NavCtrl', ['$scope', 'auth', '$timeout', '$state', "$stateParams", "$location", 
    function ($scope, auth, $state, $stateParams, $location, $timeout) {
		$scope.logIn = function () {
			auth.logIn(
				{
    				username : $scope.username,
    				password : $scope.password
    			}
    		).error(function (error) {
				$scope.error = error;
			}).then(function () {
				
			});
			$state.go('home');
			//$timeout(function() { $scope.error = false; }, 1000);
		};

    }
]);