/* NavController */
app.controller('NavCtrl', ['$scope', 'auth',
    function ($scope, auth) {
    	
    	$scope.user = {
    		username : $scope.username,
    		password : $scope.password
    	};

		$scope.logIn = function () {
			auth.logIn($scope.user).error(function (error) {
				$scope.error = error;
			}).then(function () {
				$state.go('home');
			});
			$timeout(function() { $scope.error = false; }, 1000);
		};

    }
]);