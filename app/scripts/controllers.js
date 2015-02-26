app
	.controller('demoCtrl',['$scope','PaginationService',function($scope,PaginationService){
	  PaginationService.setTotal(789);
	  PaginationService.setGroupNum(10);
	  //PaginationService.setCount(100);
	  $scope.pager = PaginationService;
	}
]);