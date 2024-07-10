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
    
        const url = `/services/ts/sample-bpm/api/TimeEntryService.ts/requests/${taskId}/approve`;
        $http.put(url, JSON.stringify(data))
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
    
        const url = `/services/ts/sample-bpm/api/TimeEntryService.ts/requests/${taskId}/reject`;
        $http.put(url, JSON.stringify(data))
            .then(function (response) {
            if (response.status != 200) {
                alert(`Unable to reject Time Entry Request: '${response.message}'`);
                return;
            }
            $scope.entity = {};
            alert("Time Entry Request Rejected");
        });
    
    };
    
    const detailsUrl = `/services/ts/sample-bpm/api/TimeEntryService.ts/requests/${taskId}/details`;
    $http.get(detailsUrl)
        .then(function (response) {
            if (response.status != 200) {
                alert(`Unable to get request details: '${response.message}'`);
                return;
            }
            const details = response.data;
    
            // fill details
            $scope.model.requester = details.requester;
            $scope.model.hours = details.hours;
            $scope.model.startDate = details.startDate;
            $scope.model.endDate = details.endDate;
            $scope.model.project = details.project;
        });

}]);