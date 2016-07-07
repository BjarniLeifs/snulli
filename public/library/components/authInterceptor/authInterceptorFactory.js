/* AuthInterceptorFactory */
/* Used to store token with all request to api for authentication */

app.factory('authInterceptor', function ($rootScope, $q, $window) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.localStorage['appToken']) {
				config.headers.Authorization = 'Bearer ' +  $window.localStorage['appToken'];
			}
			return config;
		},
		response: function (response) {
			if (response.status === 401) {
				/* Handle the case where user is not authenticated */
			}
			return response || $q.when(response);
		}
	};
});