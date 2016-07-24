

app.controller('RegisterCtrl', ['$scope', '$state', 'authFact', '$stateParams', '$location', '$timeout',
    function ($scope, $state, authFact, $stateParams, $location, $timeout) {


	    $scope.register = function () {

	    	if ( $scope.regConfirmPassword === undefined  || $scope.regPassword === undefined || $scope.regEmail === undefined  
	    		|| $scope.regName === undefined || $scope.regUsername === undefined ) {
	    			$scope.error = "Please fill out all fields";
	    			$scope.regPassword = '';
	    			$scope.regConfirmPassword = '';

	    	} 
	    	else if ($scope.regConfirmPassword === $scope.regPassword) {
	    		authFact.register(
	    			{
	    				name 	 : $scope.regName,
	    				username : $scope.regUsername,
	   					email 	 : $scope.regEmail,
	   					password : $scope.regPassword
	    			}
	    		).error(function (error) {
					$scope.error = error;
				}).then(function () {
					$timeout(function() { $state.go('home'); }, 5);
				});
				$scope.clearRegister();
	
	    	} 
	    	else {
	    		$scope.error = "The passwords did not match";
	    		$scope.regPassword = '';
	    		$scope.regConfirmPassword = '';
	    	}
	    	$timeout(function() { $scope.error = false; }, 1000);
	    	
		};
		$scope.clearRegister = function () {
			$scope.regName = '';
			$scope.regConfirmPassword = '';
			$scope.regPassword = '';
			$scope.regEmail = '';
			$scope.regUsername = '';

		}

    }
]);