angular.module('page', ["ideUI", "ideView"])
	.controller('PageController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

		let data = JSON.parse(atob(window.location.search.split("=")[1]));

		$scope.executionId = data.executionId;
		$scope.user = data.User;

		$scope.entity = {
			Project: data.Project,
			Start: new Date(data.Start),
			End: new Date(data.End),
			Hours: parseInt(data.Hours)
		};

		$scope.approve = function () {
			$http.post("/services/v4/js/sample-bpm/api/process.js/continue/" + $scope.executionId, JSON.stringify(
				{
					user: $scope.user,
					approved: true
				}
			)).then(function (response) {
				if (response.status != 202) {
					alert(`Unable to approve Time Entry Request: '${response.message}'`);
					$scope.resetForm();
					return;
				}
				alert("Time Entry Request Approved");
			});
		};

		$scope.reject = function () {
			$http.post("/services/v4/js/sample-bpm/api/process.js/continue/" + $scope.executionId, JSON.stringify(
				{
					user: $scope.user,
					approved: false
				}
			)).then(function (response) {
				if (response.status != 202) {
					alert(`Unable to reject Time Entry Request: '${response.message}'`);
					$scope.resetForm();
					return;
				}
				alert("Time Entry Request Rejected");
			});
		};

	}]);