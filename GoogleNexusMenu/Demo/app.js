var App = angular.module('App', []);

function topMenuController($scope, $window) {
	$scope.$window = $window;
	$scope.showAll = false;
	$scope.showPart = false;
	$scope.href = "http://tympanus.net/Tutorials/GoogleNexusWebsiteMenu/"
		$scope.text ="This is a simple porting of GoogleN menu "
	$scope.itemsMenu = [ {
		name : 'Home',
		href : '#home',
		icon : 'my-icon-home'
	}, { 
		name : 'Setting',
		href : '#setting',
		icon : 'my-icon-archive'
	}, {
		name : 'Portfolio',
		href : '#portfolio',
		icon : 'my-icon-pictures'
	}, {
		name : 'Blog',
		href : '#blog',
		icon : 'my-icon-article'
	}, {
		name : 'Prices',
		href : '#prices',
		icon : 'my-icon-bars'
	} ];

	$scope.mouseenter = function() {
		if (!$scope.showAll)
			$scope.showPart = true;
	};

	$scope.mouseleave = function() {
		if (!$scope.showAll)
			$scope.showPart = false;
	};
	
	$scope.menuHover = function(event){
		if($scope.showPart == true)
			$scope.menuTogle(event);
	}

	$scope.menuTogle = function(event) {
			event.stopPropagation();
		$scope.showAll = !$scope.showAll;
		$scope.showPart = false;

		if ($scope.showAll) {
			$scope.$window.onclick = function(event) {
				closeSearchWhenClickingElsewhere(event, $scope.menuTogle);
				$scope.$apply();
			};
		} else
			closeMenu();
	};


	function closeMenu() {
		$scope.showAll = false;
		$scope.$window.onclick = null;

	}

	function closeSearchWhenClickingElsewhere(event, callbackOnClose) {

		var clickedElement = event.target;
		if (!clickedElement)
			return;
		var elementParent = clickedElement.parentElement;
		if (!elementParent)
			return;
		var elementParentClasses = clickedElement.parentElement.classList;
		var clickedOnSearchDrawer = elementParentClasses.contains('menu-item')
				|| elementParentClasses.contains('gn-menu');
		console.log("sei nel menu : " + clickedOnSearchDrawer);

		if (!clickedOnSearchDrawer) {
			closeMenu()
			return;
		}

	}

}
