app
	.controller('demoCtrl',['$scope','PaginationService',function($scope,PaginationService){
	  PaginationService.setCount(20);
	  PaginationService.setTotal(777);
	  PaginationService.setGroupNum(10);
	  $scope.pager = PaginationService;
	  console.log('wfwe:'+PaginationService.getCount());
	}
]);