const formView = angular.module('forms', ['ideUI', 'ideView']);

formView.controller('FormController', ['$scope', '$http', function ($scope, $http) {

    $scope.forms = {
        form: {}
    };

    $scope.model = {};
    $scope.model.project = '';
    $scope.model.hours = 0;

    $scope.onSubmitClicked = function(){
        $http.post("/services/ts/sample-bpm/api/TimeEntryService.ts/requests", JSON.stringify($scope.model)).then(function (response) {
            if (response.status != 202) {
                alert(`Unable to submit Time Entry Request: '${response.message}'`);
                $scope.resetForm();
                return;
            }
            alert("Time Entry Request successfully submitted");
            $scope.resetForm();
        });
    }
    
    $scope.resetForm = function () {
        $scope.model = {};
        $scope.model.project = '';
        $scope.model.hours = 0;
        $scope.model.startDate = new Date();
        $scope.model.endDate = new Date();
    };
    
    $scope.resetForm();

}]);