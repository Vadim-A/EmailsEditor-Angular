var app = angular.module('EmailModule', [])

app.directive('emailsEditor', function() {
	return {
		// обязательно, для поддержки работы через элемент
		restrict: 'E',

		template: 
		'<div id="emails-editor">' + 
		'<ul class="email">' +
		
			'<li>sidorov@mail.ru<span class="remove" onclick="alert(-1)">x</span></li>' +
			'<li>popov@mail.ru<span class="remove" onclick="alert(-1)">x</span></li>' +
				
		'</ul>' +
		'<textarea ng-keydown="keypress" wrap="off" ng-model="newEmail" row="1" class="emailInput" placeholder="add more people..."></textarea>' +
		'</div>',
		replace: true,

		// наблюдение и манипулирование DOM
		link: function($scope, element, attrs) {
			/*
			$scope.keypress = function ($event){
				 console.log("=== key down pressed === ", $event);
				 if ($event.which == 13){
					 //location.path('/search/');
				 }
			};
*/
			$scope.$watch("newEmail", function (newVal, oldVal) {
			//todo
			//enter
			//http://stackoverflow.com/questions/32996621/scope-watch-is-not-triggered-after-enter-key-press-nor-location-path-is-worki
				if (newVal != null && newVal.indexOf(',') != -1){
					var email = '<li>' + newVal.substring(0,newVal.length-1) +
						'<span class="remove" onclick="alert(-1)">x</span></li>';
					var container = $('#emails-editor');
					$('#emails-editor').find('ul.email').append(email);
					$scope.newEmail = "";
				}
				
			});
		}
		
	}
})

app.controller("EmailController", ["$scope", function($scope) {

	/*
	//"controller" реализует интерфейс:  (???)
	//interface IController { 
	//	addEmails(emails:string[]):void 
	//	getEmails():string[] 
	} 
	$scope.addEmails = function (emails) {
		throw new Error("Not realized");
	}
	$scope.getEmails = function () {
		throw new Error("Not realized");
	}
	*/
	$scope.addEmails = function () {
		var email = "email" + Math.round(Math.random()*1000) + "@mail.ru";
	}
	
	$scope.getEmailsCount = function () {
		return 42;
	}
	
}])


/*
angular.module('moduleName', [])
    .directive('directiveName', function () {
        return {
             compile: function compile(temaplateElement, templateAttrs) {
                return {
                    pre: function (scope, element, attrs) {
                    },
                    post: function(scope, element, attrs) { 
                    }
                }
            },
            link: function (scope, element, attrs) {

            },
            priority: 0,
            terminal:false,
            template: '<div></div>',
            templateUrl: 'template.html',
            replace: false,
            transclude: false,
            restrict: 'A',
            scope: false,
            controller: function ($scope, $element, $attrs, $transclude, otherInjectables) {
            }           
        }
    });
	*/