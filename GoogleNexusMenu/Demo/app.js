var App = angular.module('App', [])

.service('MenuService', [ '$rootScope', function($rootScope) {
	return {
		itemsMenu : [ {
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
		} ],

		add : function(item) {
			this.menu.push(item);
			$rootScope.$broadcast('MenuService.update', this.menu);
		},
		open : {"part" : false ,	"all" : false },

		setShowPart : function(val) {
			this.open.part = val;
			$rootScope.$broadcast('MenuService.update', this.open);

		},
		setShowAll : function(val) {
			this.open.all = val;
			if (val)
				this.open.part = false;
			$rootScope.$broadcast('MenuService.update', this.open);

		}
	};
} ])

.controller('topMenuController',
		[ 'MenuService', '$scope', function(MenuService, $scope) {
			$scope.itemsMenu = MenuService.itemsMenu;
			$scope.showAll = MenuService.open.all;
			$scope.showPart = MenuService.open.part;

			$scope.mouseenter = function() {
				if (!$scope.showAll)
					MenuService.setShowPart(true);
			};

			$scope.mouseleave = function() {
				if (!$scope.showAll)
					MenuService.setShowPart(false);
			};

			$scope.menuHover = function(event) {
				if ($scope.showPart == true)
					$scope.menuTogle(event);
			}

			
			$scope.menuTogle = function(event) {
				event.stopPropagation();
				MenuService.setShowAll(true);
			};

			function closeMenu() {
				$scope.showAll = false;
				$scope.$window.onclick = null;

			}
			
			$scope.$on('MenuService.update', function(event, open) {
				$scope.showAll = open.all;
				$scope.showPart = open.part;
			});

		} ])
		
.controller('contentBodyController',
[ 'MenuService', '$scope', function(MenuService, $scope) {
	$scope.isMenuClosed = !MenuService.open.all;

	$scope.closeMenu = function() {
			MenuService.setShowAll(false);
	};
	
	$scope.$on('MenuService.update', function(event, open) {
		$scope.isMenuClosed = !open.all;
	});


} ]);