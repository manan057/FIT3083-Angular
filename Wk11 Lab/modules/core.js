angular.module('core', [])
	.factory('currentSpot', currentSpot)
	.directive('uniCurrMenuView', uniCurrMenuView)
	.directive('uniCurrMenuId', uniCurrMenuId);

//service
function currentSpot(){
	var activeMenuId = '';
	var titleText = '';
	
	return {
		setCurrentSpot: function(menuId, title){
			activeMenuId = menuId;
			titleText = title;
		}, 
		getActiveMenu: function(){
			return activeMenuId; 
		}, 
		getTitle: function(){
			return titleText;
		}
	}
}

//custom directive
function uniCurrMenuView(currentSpot){ //DI

	return function(scope, element, attrs){ //link function + DI
		console.log("link function 1 executing" + " active menu is: " + currentSpot.getActiveMenu());
		var activeMenuId = attrs["uniCurrMenuView"];
		var activeTitle = attrs["uniCurrTitle"];
		currentSpot.setCurrentSpot(activeMenuId, activeTitle);
	}

}

// //custom directive - DOES NOT WORK
// function uniCurrMenuId(currentSpot){ //DI

	// function setActive(element, menuId){ //nested function
		// if (currentSpot.getActiveMenu() == menuId)
			// element.addClass('active'); 
		// else
			// element.removeClass('active');	
	// }

	// return function(scope, element, attrs){ //link function + DI
		// var menuId = attrs["uniCurrMenuId"];
		// setActive(element, menuId);
		// console.log("link function 2 executing" + " active menu is: " + currentSpot.getActiveMenu());
	// }

// }

//custom directive -WORKS
function uniCurrMenuId(currentSpot){
	var menuElements = [];

	function setActive(element, menuId){ //nested function
		if (currentSpot.getActiveMenu() == menuId)
			element.addClass('active'); 
		else
			element.removeClass('active');	
	}
	
	return function(scope, element, attrs){
		var firstTime = true;
		var menuId = attrs["uniCurrMenuId"];
		menuElements.push({id: menuId, node: element}); //remember the code in this link function runs once for every occurrence of custom attribute data-uni-curr-menu-id
														//in DOM initial load processing, so all li elements with data-uni-curr-menu-id custom directive (2 in this case) will trigger this function
		// setActive(element, menuId);
		
		// var watcherFn = function(){ 
			// console.log(currentSpot.getActiveMenu());
			// return currentSpot.getActiveMenu(); //watchScope.$eval('getActiveMenu()');
		// };
		
		if (firstTime){
			scope.$watch(currentSpot.getActiveMenu, function(newValue, oldValue){
				for(var i = 0; i < menuElements.length; i++){
					var menuElement = menuElements[i];
					setActive(menuElement.node, menuElement.id);
				}
			});
			firstTime = false;
		}		
	}
}