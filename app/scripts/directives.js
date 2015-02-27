app
	.directive('paging',function(){
        return{
            restrict: 'EA',
            scope: {
                pager: '=config',
                action: '&'
            },
            replace: true,
            templateUrl: './views/pagination.html',
            link: function ($scope, $element, $attrs) {
                $scope.$watch('pager', function (value) {
					console.log('+++++++++++');
					console.log(value);
					console.log('+++++++++++');
                    if (!value) return;
                    $scope.pager = value;
					console.log(value);
					console.log($scope.pager.pageSize())
                });
                $scope.$watch('[pager.getCount,pager.getCurrent()]', function (newValue,oldValue) {
					console.log('-----------');
					console.log(newValue==oldValue);
					console.log('-----------');
                    if (newValue == oldValue) return;
                    $element.find('.noText').html('');
					console.log($scope.pager.numList());
                    $scope.pageList = $scope.pager.numList();
                });
            },
            controller: function($scope, $element, $attrs){
				$scope.pageCount = $scope.pager.getCount();
				$scope.pageList = $scope.pager.numList();
                $scope.myPage = function(e){
                    if(e && e.keyCode !== 13){return;}
                    if($scope.pageNumber>0 && $scope.pageNumber < $scope.pager.pageSize()){
                        $scope.pager.setPage($scope.pageNumber);
                        $scope.pageNumber = '';
                    }
                };
            }
        }
    });