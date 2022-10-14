angular.module('page', ["ideUI", "ideView"])
	.controller('PageController', ['$scope', '$http', function ($scope, $http) {

		$scope.entity = {};
		$scope.optionsProject = [{
			text: "Project Alpha",
			value: "Project Alpha"
		}, {
			text: "Project Beta",
			value: "Project Beta"
		}, {
			text: "Project Evolution",
			value: "Project Evolution"
		}, {
			text: "Project Next",
			value: "Project Next"
		}];

		$scope.isValid = function (isValid, property) {
			$scope.formErrors[property] = !isValid ? true : undefined;
			for (let next in $scope.formErrors) {
				if ($scope.formErrors[next] === true) {
					$scope.isFormValid = false;
					return;
				}
			}
			$scope.isFormValid = true;
		};

		$scope.submit = function () {
			$http.post("/services/v4/js/sample-bpm/api/process.js?debug=true", JSON.stringify($scope.entity)).then(function (response) {
				if (response.status != 202) {
					alert(`Unable to submit Time Entry Request: '${response.message}'`);
					$scope.resetForm();
					return;
				}
				alert("Time Entry Request successfully submitted");
			});
		};

		$scope.resetForm = function () {
			$scope.entity = {};
			$scope.formErrors = {
				Project: true,
				Start: true,
				End: true,
				Hours: true,
			};
		};

		$scope.resetForm();

	}]);