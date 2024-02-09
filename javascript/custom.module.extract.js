app.component('prmServiceDetailsAfter', {
	bindings: { parentCtrl: '<' },
	controller: 'prmServiceDetailsAfterController',
	template: ''
});
app.controller('prmServiceDetailsAfterController', [function () {
	this.$onInit = function() {
		formatContentsField(this);
	};
}]);
