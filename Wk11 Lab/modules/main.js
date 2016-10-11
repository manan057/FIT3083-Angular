angular.module('main', ['ngRoute', 'core', 'maintenance'])
	.controller('adminCtrl', AdminCtrl)
	.controller('mainCtrl', MainCtrl)
	.config(function ($routeProvider){
		$routeProvider.when('/units', {templateUrl:'views/units.html', controller: 'unitsCtrl'});
		$routeProvider.when('/students', {templateUrl:'views/students.html', controller: 'studentsCtrl'});
		$routeProvider.when('/lectures', {templateUrl:'views/lectures.html', controller: 'lecturesCtrl'});
		$routeProvider.otherwise({templateUrl:'views/main.html', controller: 'mainCtrl'});
	});
	
function AdminCtrl($scope, currentSpot){
	//make isActive and getTitle available to DOM sub tree
	$scope.isActive = isActive; 	
	$scope.getTitle = getTitle; 
	
	function isActive(menuId){
		return currentSpot.getActiveMenu() == menuId; 
	}
	
	function getTitle(){
		return currentSpot.getTitle();
	}

} 

function MainCtrl(){

} 