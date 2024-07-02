const formView = angular.module('forms', ['ideUI', 'ideView']);

formView.controller('FormController', ['$scope', '$http', function ($scope, $http) {

    $scope.forms = {
        form: {}
    };

    $scope.model = {};

    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let taskId = params.get("taskId");
    console.log("Task id: " + taskId);
    
    $scope.approve = function () {
        $http.post("/services/bpm/bpm-processes/tasks/" + taskId, JSON.stringify(
            {
                action: "COMPLETE",
                data: {
                    user: $scope.user,
                    decision: $scope.model.decisionText,
                    isRequestApproved: true
                }
            }
        )).then(function (response) {
            if (response.status != 200) {
                alert(`Unable to approve Time Entry Request: '${response.message}'`);
                return;
            }
            $scope.entity = {};
            alert("Time Entry Request Approved");
        });
    };
    
    $scope.reject = function () {
        $http.post("/services/bpm/bpm-processes/tasks/" + taskId, JSON.stringify(
            {
                action: "COMPLETE",
                data: {
                    user: $scope.user,
                    decision: $scope.model.decisionText,
                    isRequestApproved: true
                }
            }
        )).then(function (response) {
            if (response.status != 200) {
                alert(`Unable to reject Time Entry Request: '${response.message}'`);
                return;
            }
            $scope.entity = {};
            alert("Time Entry Request Rejected");
        });
    };

}]);