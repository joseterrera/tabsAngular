;(function(window) {

angular.module('app', [])
	.directive('tab', function(){
		return {
			//directive will be an element
			restrict: 'E',
			//to include a document inside another document
			transclude: true,
			//whenever the element directive is used, this is inserted into the DOM.
			template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
			require: '^tabset',
			scope: {
				heading: '@'
			},
			//linking function is similar to a controller
			link: function(scope, elem, attr, tabsetCtrl){
				scope.active = false

				scope.disabled = false
  				if(attr.disable) {
    			attr.$observe('disable', function(value) {
      			scope.disabled = (value !== 'false')
    	})
  	}
				tabsetCtrl.addTab(scope)
			}
		}
	})
	.directive('tabset', function(){
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			templateUrl: 'tabset.html',
			bindToController: true,
			//controllerAs allows us to bind properties directly to the controller object using this and have them accessible via tabset in the template
			controllerAs: 'tabset',
			//allows us to specify an angular controller
			controller: function(){
				var self = this
				self.tabs = []
				//this method will append a tab to the self.tabs array.
				self.addTab = function addTab(tab){
					self.tabs.push(tab)
				}
				self.select = function(selectedTab){
					 if(selectedTab.disabled) { return }
					angular.forEach(self.tabs, function(tab){
						if(tab.active && tab !==selectedTab){
							tab.active =false;
						}
					})
					selectedTab.active = true;
				}
			}
		}
	})

})(window);