angular.module('page', ["ideUI", "ideView"])
	.controller('PageController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

		$scope.entity = JSON.parse(atob(window.location.search.split("=")[1]));
		// $scope.entity = {
		// 	User: "Test",
		// 	Project: $location.search().Project,
		// 	Start: new Date(),
		// 	End: new Date(),
		// 	Hours: 40
		// };

		$scope.approve = function () {
			$http.post("/services/v4/js/sample-bpm/api/process.js", JSON.stringify($scope.entity)).then(function (response) {
				if (response.status != 202) {
					alert(`Unable to approve Time Entry Request: '${response.message}'`);
					$scope.resetForm();
					return;
				}
				alert("Time Entry Request Approved");
			});
		};

		$scope.reject = function () {
			$http.post("/services/v4/js/sample-bpm/api/process.js", JSON.stringify($scope.entity)).then(function (response) {
				if (response.status != 202) {
					alert(`Unable to reject Time Entry Request: '${response.message}'`);
					$scope.resetForm();
					return;
				}
				alert("Time Entry Request Rejected");
			});
		};

	}]);