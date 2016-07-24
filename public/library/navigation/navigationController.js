app.controller('NavCtrl', ['$scope', '$state', 'auth', '$stateParams', '$location', '$timeout', '$window',
    function ($scope, $state, auth, $stateParams, $location, $timeout, $window)  {
		
    	$scope.isLoggedIn = auth.isLoggedIn();
    	$scope.isAdmin 	  = auth.isAdmin();

    	$scope.logout = function () {
    		auth.logOut();
    		$scope.isLoggedIn = auth.isLoggedIn();
    		$scope.isAdmin    = auth.isAdmin();	
    	}
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
				$scope.isLoggedIn = auth.isLoggedIn();
				$scope.isAdmin 	  = auth.isAdmin();
				$timeout(function() { 
					$window.location.reload();
				}, 5);
			});
			
		};
    }
]);