//bower install angulat-tagsinput

angular.module('ngBoilerplate', [
    'ngTagsInput',
])
.controller('nameCTRL', ['$scope', function($scope, someService){
    $scope.loadingPropery = false;
    $scope.getData = function(query, loadingProperyName){
        $scope[loadingProperyName] =  true;
        return someService.getData($query).$promise.then(function(data){
            $scope[loadingProperyName] = false;
            return data;
        });
    };

    $scope.resultArray = [];
    /*
    // property will be after tags input's work

    $scope.resultArray = [{
        "_id": 1,
        "code": "abc",
        "blablaName":"john martin"
    },{
        "_id":2
        "code": "bcd",
        "blablaName":"joe cocon"
    }]
     */
}])
.service('someService', function($resource){
    return $resource('/',{},{
        getData: {
            url: 'mydata.json',
            method: 'get',
            isArray: true
        }
    });
});

//template.html
<img src="loader.gif" ng-show="loadingPropery">

<tags-input key-property="_id" display-property="code" ng-model="resultArray" placeholder="it is input of tags">
    <auto-complete debounce-delay="500"  display-property="blablaName" source="getData($query, 'loadingPropery')"></auto-complete>
</tags-input>

////////////example view
//
// ([abc], jo           )
//   |----------------|
//   | john martin    |
//   | itan candy     |
//   |----------------|


//mydata.json
[{
    "_id": 1,
    "code": "abc",
    "blablaName":"john martin"
},{
    "_id":2
    "code": "bcd",
    "blablaName":"joe cocon"
},{
    "_id":3
    "code": "cde",
    "blablaName":"itan candy"
}]
