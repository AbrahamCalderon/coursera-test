(function () {
   
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope, $filter) {
        $scope.message = "";
        $scope.items = "";
        
        $scope.checkIfTooMuch = function(){
            var items = $scope.items.split(",");
            if($scope.items == ""){                
                $scope.message = "Please enter data first";
                $scope.messageColor={'color': 'red'};
            }
            else{
                var nonBlanks = new Array();
                for(var i = 0; i < items.length; i++){
                    if(!(items[i].length === 0 || !items[i].trim())){
                        nonBlanks.push(items[i]);
                    }
                }
                if(nonBlanks.length == 0){// In the case case of all empties: i.e.: ,,,
                    $scope.message = "Please enter data first";
                    $scope.messageColor={'color': 'red'};
                }
                else if(nonBlanks.length <= 3){
                    $scope.message = "Enjoy!";
                    $scope.messageColor={'color': 'green'};
                }
                else{
                    $scope.message = "Too Much!";
                    $scope.messageColor={'color': 'green'};
                }
            }
        };
    }

})();