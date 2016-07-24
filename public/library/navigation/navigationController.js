app.controller('NavCtrl', ['$scope', '$state', 'authFact', '$stateParams', '$location', '$timeout', '$window',
    function ($scope, $state, authFact, $stateParams, $location, $timeout, $window)  {
		
    	$scope.isLoggedIn = authFact.isLoggedIn();
    	$scope.isAdmin 	  = authFact.isAdmin();

    	$scope.logout = function () {
    		authFact.logOut();
    		$scope.isLoggedIn = authFact.isLoggedIn();
    		$scope.isAdmin    = authFact.isAdmin();	
    	}
    	$scope.logIn = function () {
			authFact.logIn(
				{
    				username : $scope.username,
    				password : $scope.password
    			}
    		).error(function (error) {
				$scope.error = error;
				$timeout(function() { $scope.error = false; }, 1000);
			}).then(function () {
				$scope.isLoggedIn = authFact.isLoggedIn();
				$scope.isAdmin 	  = authFact.isAdmin();
				$timeout(function() { 
					$window.location.reload();
				}, 5);
			});
			
		};
    }
]);