var app = angular.module('EmailModule', [])

app.directive('emailsEditor', function () {

	var _emails = [
		{ id: 1, email: 'sidorov@mail.ru' },
		{ id: 2, email: 'popov@mail.ru' }
	];
	
	function _addEmail(email) {
		_emails.push({
			id: _emails[_emails.length - 1].id + 1,
			email: email
		});
	};

	function _delEmail(email) {
		_emails.splice(_emails.indexOf(email), 1);
	}

	function _validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function delEmail() {
		_delEmail(this.email);
	};

	function onEmailEdit() {
		//NOTE: Через ng-keypress и event нельзя определить новое и старое значение.
		//А так же сложно определить сочетание клавишь (будет ли event.keyCode на другой раскладке таким же?)
		//if (event.ctrlKey && (event.keyCode == 86 || event.keyCode == 87)) {
		//}
		
		if (this.newEmail != null && this.newEmail.length > 0 && (event.keyCode == 13 || event.key == ',')) {
			_addEmail(this.newEmail);
			this.newEmail = "";
			event.preventDefault();
		}
	};

	function onBlur() {
		if (this.newEmail != null && this.newEmail.length > 0) {
			_addEmail(this.newEmail);
			this.newEmail = "";
		}
	};

	function onEmailPaste() {
		this.emailPaste = true;
	}

	function getBadEmailClass() {
		return _validateEmail(this.email.email) ? '' : 'badEmail';
	};
	

	return {
		restrict: 'E',

		template: 
'<div id="emails-editor">' + 
'<ul class="email">' +
	'<li ng-repeat="email in emails"><span class={{getBadEmailClass()}}>' + //NOTE: ng-class не применяет стили
		'{{email.email}}</span><span class="remove" ng-click="delEmail()">x</span></li>' +
'</ul>' +
'<textarea ng-blur="onBlur()" ng-paste="onEmailPaste()" ng-keypress="onEmailEdit()" wrap="off" ng-model="newEmail" row="1" class="emailInput" placeholder="add more people..."></textarea>' +
//'<textarea ng-paste="expression" ng-keydown="onEmailEdit()" wrap="off" ng-model="newEmail" row="1" class="emailInput" placeholder="add more people..."></textarea>' +
'</div>',

		replace: true,//http://stackoverflow.com/questions/15285635/how-to-use-replace-of-directive-definition

		link: function (scope, element, attrs) {
			scope.emails = _emails; //список почтовых ящиков
			scope.getBadEmailClass = getBadEmailClass; // подчеркивание почтового ящика, не соответствующего шаблону
			scope.delEmail = delEmail; // удаление блока почтового ящика из списка
			scope.onEmailEdit = onEmailEdit; //при редактировании поля с почтовым ящиком необходмо сформировать блок на нажатие ',' и 'enter'
			scope.onBlur = onBlur; //действие при потере фокуса 

			scope._addEmail = _addEmail; //for controller
			

			//формирование блоков почтовых ящиков при ctrl+v обрабатывается отдельно
			scope.onEmailPaste = onEmailPaste;
			scope.emailPaste = false;
			scope.$watch("newEmail", function (newVal, oldVal, scope) {
				if (scope.emailPaste) {
					newVal = newVal.split('\n').join(',');
					newVal = newVal.split('\t').join(',');
					newVal = newVal.split(' ').join(',');
					newVal.split(',').forEach(function (element, index, array) {
						if (element.length > 0) {
							_addEmail(element);
						}
					});
					scope.newEmail = "";
					scope.emailPaste = false;
				}
			});
		
		},

		
		//https://toddmotto.com/dynamic-controllers-in-directives-with-the-undocumented-name-property/
		name: 'ctrl', //controller name...
		controller: '@' //...from attribute
		
	}
})

app.controller("controller", function ($scope) {


	$scope.addEmails = function () {
		//while (this.emails.indexOf(email) != -1) {
			var email = "email" + Math.round(Math.random() * 1000) + "@mail.ru";
		//};
			this._addEmail(email);
	}
	
	$scope.getEmailsCount = function () {
		alert(this.emails.length);
	}
	
})


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