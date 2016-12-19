/**
 * Created by BALASUBRAMANIAM on 19-12-2016.
 */
angular.module('exampleApp', ['ui.grid'])
    .controller('exampleCtrl', ['$scope', 'uiGridConstants', function($scope, uiGridConstants) {
        var animals = [
            { id: 1, type: 'Mammal', name: 'Elephant' },
            { id: 2, type: 'Reptile', name: 'Turtle' },
            { id: 3, type: 'Mammal', name: 'Human' }
        ];

        var animalTypes = [
            { value: 'Mammal', label: 'Mammal' },
            { value: 'Reptile', label: 'Reptile'}
        ];

        $scope.animalGrid = {
            enableFiltering: true,
            columnDefs: [
                {
                    name: 'type',
                    field: 'type',
                    filter: { selectOptions: animalTypes, type: uiGridConstants.filter.SELECT }
                },
                { name: 'name', name: 'name'}
            ],
            data: animals
        };

    }]);