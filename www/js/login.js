controllers

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $firebaseArray, $location, $rootScope, backend) {

  var firebaseRef = new Firebase("https://lover-position.firebaseio.com/");

	$scope.loginData = {};
	$scope.user = email;

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
		$scope.login_error = '';
		$scope.loading = true;
	    var ref = new Firebase("https://lover-position.firebaseio.com/");
		try{
			ref.authWithPassword({
			  email    : $scope.loginData.username,
			  password : $scope.loginData.password
			}, handler);
		}catch(e){
			$scope.loading = false;
			$scope.login_error = e.message;
			
			  if(!$scope.$$phase) {
				$scope.$apply();
			  }
		}
    
	};
	
	$scope.gotoSignup = function(){
		$location.path('/signup');		
	}
	
	$scope.loginProvider = function(method){
		if(method == 'popup'){
			firebaseRef.authWithOAuthPopup("facebook", handler, {
				scope: 'email'
			});
		}
		else{			
			firebaseRef.authWithOAuthRedirect("facebook", handler, {
				scope: 'email'
			});
		}
	}
	
	function handler(error, authData) {
		$scope.loading = false;
		if (error) {
			if (error.code === "TRANSPORT_UNAVAILABLE") {
				$scope.loginProvider("facebook", 'popup');
			} 
			$scope.login_error = error.message;
			$scope.$apply();
		} else {
			backend.loadUser();
			backend.loadHeart();
			$location.path('/app/home');
			$scope.$apply();
		}
	}
});