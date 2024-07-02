const formView = angular.module('forms', ['ideUI', 'ideView']);

formView.controller('FormController', ['$scope', '$http', function ($scope, $http) {

    $scope.forms = {
        form: {}
    };

    $scope.model = {};

    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let taskId = params.get("taskId");
    
    $scope.approve = function () {
        const data = {
            taskId : taskId,
            reason: $scope.model.reason
        };
    
        $http.post("/services/ts/sample-bpm/api/TimeEntryService.ts/approveRequest", JSON.stringify(data))
            .then(function (response) {
            if (response.status != 200) {
                alert(`Unable to approve Time Entry Request: '${response.message}'`);
                return;
            }
            $scope.entity = {};
            alert("Time Entry Request Approved");
        });
    };
    
    $scope.reject = function () {
        const data = {
            taskId : taskId,
            reason: $scope.model.reason
        };
    
        $http.post("/services/ts/sample-bpm/api/TimeEntryService.ts/rejectRequest", JSON.stringify(data))
            .then(function (response) {
            if (response.status != 200) {
                alert(`Unable to reject Time Entry Request: '${response.message}'`);
                return;
            }
            $scope.entity = {};
            alert("Time Entry Request Rejected");
        });
    };

}]);