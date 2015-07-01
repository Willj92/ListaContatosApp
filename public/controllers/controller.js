var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World do controller");

var refresh = function(){

	$http.get('/listacontato').success(function(response){
		console.log("Eu recebi o dado que eu requeri");
		$scope.listacontato = response;
		$scope.contato = "";
});
};

refresh();

$scope.addContato = function(){
	console.log($scope.contato);
	$http.post('/listacontato', $scope.contato).success(function(response){
		console.log(response);
		refresh();
	});
};

$scope.excluir = function(id) {
  console.log(id);
  $http.delete('/listacontato/' + id).success(function(response) {
    refresh();
  });
};

$scope.editar = function(id) {
  console.log(id);
  $http.get('/listacontato/' + id).success(function(response) {
    $scope.contato = response;
  });
};  

$scope.atualizar = function() {
  console.log($scope.contato._id);
  $http.put('/listacontato/' + $scope.contato._id, $scope.contato).success(function(response) {
    refresh();
  })
};

$scope.desmarcar = function() {
  $scope.contato = "";
  refresh();
}

}]);﻿