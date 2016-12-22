var myapp = angular.module('MyApp',[]);

myapp.controller('GridCtl',['$scope','$http',function($scope,$http)
{
// Historical data
    $scope.history = [];
    // Default data (can be loaded from a database)
  //  $scope.records = [
   //     { state: 'CA', price: 22, tax: 5, include: false },
   //     { state: 'MA', price: 32, tax: 8, include: false },
   //     { state: 'IL', price: 48, tax: 3, include: true }
  //  ];

    $scope.Users= [

    ];
    $scope.records=[];



    $http({
        method: 'GET',
        dataType: "jsonp",

        headers: {
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:12800/FetchData'



    }).success(function(info)
    {

        angular.forEach(info,function(x)
        {
            $scope.records.push({
                "InventoryId":x.InventoryId,
                "Name":x.Name,
                "PatientAccountNo":x.PatientAccountNo,
                "StartDate":x.StartDate,
                "EndDate":x.EndDate

            });
            $scope.Users.push({
                "UserId":x.UserId,
                "Name":x.Name
            })
        });

    });


     $scope.tranList=[];
    $scope.status=false;
     $scope.change= function(record,status,index)
    {
        console.log(index);
       if(status)
        $scope.tranList.push(record);
       if(!status)
           $scope.tranList.splice(index,1);
       console.log($scope.tranList);
    }
    $scope.userData={};
    $scope.tranUser=[];
    $scope.mappedData=[];
    $scope.chooseUser=function()
    {
        $scope.mappedData.push($scope.userData);
        $scope.mappedData.push($scope.tranList);
        console.log($scope.mappedData);
    $scope.tranList=[];
    $scope.userData={};

}

    $scope.submit=function()
    {
        console.log(JSON.stringify($scope.mappedData));
        $http({
            method: 'post',
            datatype: 'jsonp',
            params: { obj: JSON.stringify( $scope.mappedData) },
            headers: {
                'Content-Type': 'application/json'

            },
            url: 'http://localhost:12800/FetchData/AddData'

        }).then(function (data) {
            //$scope.result = JSON.parse(data);
            console.log(data);

        });
    }
    $scope.test=function(data)
    {
        console.log("checked");
        console.log(data);
       // $scope.$watch(, function(newValue, oldValue) {
         //   console.log(newValue,oldValue);
       // });

    }
    // Total prices
    $scope.Totals = function () {
        var priceTotal = 0;
        var taxTotal = 0;
        // Loop through main records and calculate aggregate prices and taxes if include is true
        angular.forEach($scope.records, function (record) {
            if (record.include) {
                //console.log(record.price);
                priceTotal += record.price;
                taxTotal += record.tax;
            }
        });
        // Return aggregate data
        return { price: priceTotal , tax: taxTotal };
    };
    // Delete data
    $scope.Delete = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.history.length === 10)
            $scope.history.shift();
        // Add deleted record to historical records
        $scope.history.push($scope.records[index]);
        // Remove from main records (using index)
        $scope.records.splice(index, 1);
    };
    // Reset new data model
    $scope.Reset = function () {
        $scope.newState = '';
        $scope.newPrice = 0;
        $scope.newTax = 0;
    }
    $scope.Reset();
    // Add new data
    $scope.Add = function () {
        // Do nothing if no state is entered (blank)
        if (!$scope.newState)
            return;
        // Add to main records
        $scope.records.push({
            state: $scope.newState,
            price: $scope.newPrice,
            tax: $scope.newTax,
            include: false
        });
        // See $Scope.Reset...
       // $scope.Reset();
    }
    // Undo action (delete)
    $scope.Undo = function () {
        // Add last / most recent historical record to the main records
        $scope.records.push($scope.history[ $scope.history.length - 1 ]);
        // Remove last / most recent historical record
        $scope.history.pop();
    }
}]);

