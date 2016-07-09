var app = angular.module('EmailModule', [])

app.directive('emailsEditor', function () {
	var emails = [
		{ id: 0, email: 'sidorov@mail.ru' },
		{ id: 1, email: 'popov@mail.ru' },
	
	];

	var delEmail = function (emails, email) {
		emails.splice(emails.indexOf(email), 1);
	};

	var keypress = function (val, a, s) {
		//TODO: Как здесь получить emails ???
		debugger;
		if (event.keyCode == 13 || (val != null && val.indexOf(',') != -1)) {
			scope.emails.push({
				id: scope.emails[scope.emails.length - 1].id + 1,
				email: val.substring(0, val.length - 1)
			});
			newEmail = "";
		}
	};

	return {
		restrict: 'E',

		template: 

'<div id="emails-editor">' + 
'<ul class="email">' +
	"<li ng-repeat='email in emails'>{{email.email}}<span class='remove' ng-click='delEmail(emails, email)'>x</span></li>" +
'</ul>' +
'<textarea ng-keypress="keypress(newEmail, scope, $scope)" wrap="off" ng-model="newEmail" row="1" class="emailInput" placeholder="add more people..."></textarea>' +
'</div>',

		replace: true,//http://stackoverflow.com/questions/15285635/how-to-use-replace-of-directive-definition

		// наблюдение и манипулирование DOM
		link: function (scope, element, attrs) {
			scope.emails = emails;
			scope.delEmail = delEmail;
			scope.keypress = keypress;

			/*
			$scope.keypress = function ($event){
				 console.log("=== key down pressed === ", $event);
				 if ($event.which == 13){
					 //location.path('/search/');
				 }
			};
*/

			scope.$watch("newEmail", function (newVal, oldVal, scope, q,w,e,r,t) {
			//todo
				//enter
				//debugger;
				//$event.keyCode == 13
				//http://stackoverflow.com/questions/32996621/scope-watch-is-not-triggered-after-enter-key-press-nor-location-path-is-worki
/*
				if (newVal != null && newVal.indexOf(',') != -1) {
					scope.emails.push({
						id: scope.emails[scope.emails.length - 1].id + 1,
						email: newVal.substring(0, newVal.length - 1)
					});
					scope.newEmail = "";
				}
	*/			
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