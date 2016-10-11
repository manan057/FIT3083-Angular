angular.module('maintenance', [])
	.controller('unitsCtrl', UnitsCtrl)
	.controller('studentsCtrl', StudentsCtrl)
	.controller('lecturesCtrl', LecturesCtrl);
	
function UnitsCtrl($scope, currentSpot) {
	
	$scope.testData = "this is an ng-include/ng-controller test";
	
	$scope.unitsAM = units;
	$scope.view = "";
	
	setView('list');
	
	function setView(view){
		$scope.view = view;
	}	
} 

function StudentsCtrl(currentSpot) {

}


function LecturesCtrl(currentSpot) {

}
