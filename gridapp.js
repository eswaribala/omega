/**
 * Created by BALASUBRAMANIAM on 19-12-2016.
 */
myapp = angular.module('MyApp', ['ui.grid','ui.grid.pagination']);

myapp.controller('UIController',['$scope','$http',function($scope,$http)
{
    $scope.myData = [];

    $scope.gridOptions1 = {
        paginationPageSizes: [5, 10, 25],
        paginationPageSize: 25,
        enableFiltering: true,

        columnDefs: [
            { name: 'title'
                },
            { name: 'body' }
        ]
    };

    $scope.gridOptions2 = {
        enablePaginationControls: false,
        paginationPageSize: 25,
        columnDefs: [
            { name: 'title' },
            { name: 'body' }
        ]
    };

    $scope.gridOptions2.onRegisterApi = function (gridApi) {
        $scope.gridApi2 = gridApi;
    }
    $http({
        method: 'GET',
        dataType: "jsonp",

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        url: 'http://jsonplaceholder.typicode.com/posts'
    }).success(function (data) {
        angular.forEach(data,
            function(aSingleRow) {
                $scope.myData.push({
                    "title": aSingleRow.title,
                    "body": aSingleRow.body
                });

            });
        $scope.gridOptions1.data = $scope.myData;
        $scope.gridOptions2.data =$scope.myData;
        $scope.status = data;
        console.log( $scope.status);
    });



}])