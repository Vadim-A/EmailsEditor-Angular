//About business logic in ng-app
//https://www.codeschool.com/discuss/t/angularjs-should-business-logic-go-into-controller-or-link-in-custom-directives/4821/2
//http://stackoverflow.com/questions/14480018/app-architecture-directives-vs-controllers

var app = angular.module('EmailModule', [])

app.directive('emailsEditor', function () {
	//There are only template and functions whitch strongly connected with template in the directive

	return {
		restrict: 'E', //can be used only like element "<emails-editor></emails-editor>"
		replace: true,//means that directive in html ("<emails-editor></emails-editor>") will be replased by template

		//https://toddmotto.com/dynamic-controllers-in-directives-with-the-undocumented-name-property/
		name: 'ctrl', //controller name...
		controller: '@', //...from attribute

		template: //this content will be in html instead "<emails-editor></emails-editor>"
'<div id="emails-editor">' + 
'<ul class="email">' +
	'<li ng-repeat="email in _emails"><span class={{getBadEmailClass()}}>' + //NOTE: using "ng-class" styles does not apply. What wrong?
		'{{email}}</span><span class="remove" ng-click="delEmail(email)">x</span></li>' +
'</ul>' +
//'<textarea ng-blur="onBlur()" ng-paste="onPaste()" ng-keypress="onEmailEdit()" wrap="off" ng-model="newEmail" row="1" class="emailInput" placeholder="add more people..."></textarea>' +
'<input type="text" ng-paste="onPaste()" ng-keypress="onEmailEdit()" ng-blur="onBlur()" ng-model="newEmail" placeholder="add more people ..." class="emailInput2">' +
'</div>',

		link: function (scope, element, attrs) {

			scope.getBadEmailClass = function () {//return class name for bad emails
				return this._validateEmail(this.email) ? '' : 'badEmail';
			};

			scope.onEmailEdit = function () {
				//Using in "ng-keypress" event. 
				//Does not used to catch "ctrl+v" event because it is difficult to determine keyCode for "V", key keeping in mind the multilanguage OS.
				//For "ctrl+v" used "ng-paste" event
				if (event.keyCode == 13 || event.key == ',') { //"Enter" or "Comma"
					this.addEmail(this.newEmail);
					this.newEmail = "";
					event.preventDefault();
				}
			};

			//Add email on lost focus
			scope.onBlur = function () {
				if (this.newEmail != null && this.newEmail.length > 0) {
					this.addEmail(this.newEmail);
					this.newEmail = "";
				}
			};

			scope.emailPaste = false;
			scope.onPaste = function (newEmail) {
				//"ng-paste" event does not alloy to get paste values, but scope.$watch does.
				//In "ng-paste" event used variable to fix that "paste" event is happened
				this.emailPaste = true;
			};
			scope.$watch("newEmail", function (newVal, oldVal, scope) {
				//Cannot determine "Enter" key in listener 
				if (scope.emailPaste) { //only when "paste" event is happened
					newVal = newVal.split('\n').join(',');
					newVal = newVal.split('\t').join(',');
					newVal = newVal.split(' ').join(',');
					scope.addEmails(newVal.split(','));
					scope.newEmail = "";
					scope.emailPaste = false;
				}
			});
		
		},
	}
})

app.controller("controller", function ($scope) {

	$scope._emails = ['sidorov@mail.ru'];
	
	$scope._validateEmail = function (email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	$scope.addEmail = function (email) {
		if (email && email.length > 0 && this._emails.indexOf(email) == -1) {
			this._emails.push(email);
		}
	};

	$scope.delEmail = function (email) {
		this._emails.splice(this._emails.indexOf(email), 1);
	};

	$scope.addEmails = function (emails) {
		if (emails) {
			emails.forEach(function (element, index, array) {
				this.addEmail(element);
			}, this); //NOTE: [this] argument for input current context (scope) into "forEach"
		} else {
			var email;
			do {
				var email = "email" + Math.round(Math.random() * 1000) + "@mail.ru";
			} while (this._emails.indexOf(email) != -1);
			this.addEmail(email);
		}
	};
	
	$scope.getEmailsCount = function () {
		alert(this._emails.length);
	};
	
	$scope.getEmails = function () {
		return this._emails;
	};
})