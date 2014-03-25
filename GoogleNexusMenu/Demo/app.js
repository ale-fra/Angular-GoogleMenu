var App = angular.module('App', [])

.service('MenuService', [ '$rootScope', function($rootScope) {
	return {
		itemsMenu : [ {
			name : 'Home',
			href : '#home',
			icon : 'fa-home'
		}, {
			name : 'Setting',
			href : '#setting',
			icon : 'fa-cogs'
		}, {
			name : 'Portfolio',
			href : '#portfolio',
			icon : 'fa-desktop',
			children : [ {
				name : 'child 1',
				href : '#child_1',
				icon : 'fa-sort-amount-asc'
			}, {
				name : 'child 2',
				href : '#child_2',
				icon : 'fa-sort-amount-asc'
			} ]
		}, {
			name : 'Blog',
			href : '#blog',
			icon : 'fa-book'
			}, {
			name : 'Prices',
			href : '#prices',
			icon : 'fa-eur',
			children : [ {
				name : 'child 3',
				href : '#child_3',
				icon : 'fa-sort-amount-asc'
			}, {
				name : 'child 4',
				href : '#child_4',
				icon : 'fa-sort-amount-asc'
			} ]
		} ],

		open : {
			"part" : false,
			"all" : false,
			"chatSideClosed":false
		},

		setShowPart : function(val) {
			this.open.part = val;
			$rootScope.$broadcast('MenuService.update', this.open);
		},
		setShowAll : function(val) {
			this.open.all = val;
			if (val)
				this.open.part = false;
			$rootScope.$broadcast('MenuService.update', this.open);

		},
		setChatSide:function(val) {
			this.open.chatSideClosed = val;
			$rootScope.$broadcast('MenuService.chatChangedState', this.open);
		}
	};
}])
.controller('contentBodyController',[ 'MenuService', '$scope', function(MenuService, $scope) {
	$scope.isMenuClosed = !MenuService.open.all;

	$scope.closeMenu = function() {
		MenuService.setShowAll(false);
	};

	$scope.$on('MenuService.update', function(event, open) {
		$scope.isMenuClosed = !open.all;
	});
	return $scope;
}])
.controller('chatController',[ 'MenuService', '$scope', function(MenuService, $scope) {
	$scope.title= "Chat";
	$scope.userImage ="./img/defaultPhoto.png"
	$scope.chatSide = !MenuService.open.chatSide;

	$scope.chatSideChangeState= function(){
		MenuService.setChatSide(!$scope.chatSide);
	},
	
	$scope.$on('MenuService.chatChangedState', function(event, open) {
		$scope.chatSide = open.chatSideClosed;
	});
	return $scope;
}])
.directive('leftMenu',function(MenuService){
  return {
    restrict : 'A',
    template: '<li class="my-trigger"  ng-click="menuTogle($event)" ng-mouseenter="showAll || mouseenter()" ng-mouseleave="showAll || mouseleave()">' +
					'<a id="triggerMenu" class="fa fa-3x fa-bars" ng-class="{\'active\':showAll}"></a>'+
					'<nav ng-mouseenter="showAll|| menuHover($event)" class="my-menu-wrapper" ng-class="{\'my-open-part\' : showPart,\'my-open-all\' : showAll}" >'+
						'<div class="my-scroller">'+
							'<ul class="my-menu">'+
								'<li ng-repeat="item in itemsMenu" ng-mouseenter="showChildren = true" ng-mouseleave="showChildren = false" ng-model="showChildren" ng-class="{\'my-submenu-open\': showChildren}" >'+
									'<a href="{{item.href}}">'+
										'<i class="icon-menu fa {{item.icon}}"></i>{{ item.name }} <i ng-show="item.children.length>0" class="fa fa-angle-double-down float-right-icon"></i>'+
									'</a>'+
									'<ul  ng-show="item.children.length>0" class="my-submenu">'+
										'<li ng-repeat="item in item.children" class="test">'+
											'<a href="{{item.href}}"><i class="icon-menu fa {{item.icon}}"></i>{{ item.name }}</a>'+
										'</li>'+
									'</ul>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</nav>'+
				'</li>',
    replace: true,
    controller:function(MenuService, $scope) {
		$scope.itemsMenu = MenuService.itemsMenu;
		$scope.showAll = MenuService.open.all;
		$scope.showPart = MenuService.open.part;

		$scope.mouseenter = function() {
				MenuService.setShowPart(true);
		};

		$scope.mouseleave = function() {
				MenuService.setShowPart(false);
		};

		$scope.menuHover = function(event) {
				MenuService.setShowAll(true);
		}
		$scope.menuTogle = function(event) {
			if(event.target.id != "triggerMenu")
				return;
			event.stopPropagation();
			MenuService.setShowAll(!$scope.showAll);
		};

		$scope.$on('MenuService.update', function(event, open) {
			$scope.showAll = open.all;
			$scope.showPart = open.part;
		});
		return $scope;

	}
  };
});


/*
 
 
var aa= {};
for(i=0;i < MenuService.itemsMenu.length;i++){
   console.log(i);
   aa[MenuService.itemsMenu[i].href]= {icon:MenuService.itemsMenu[i].icon};
}

*/



