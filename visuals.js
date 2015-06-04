var app = angular.module('myApp', ['uiGmapgoogle-maps']);

app.controller('MapController', ['$scope', '$http', function ($scope, $http) {
  $scope.map = { center: { latitude: 37.4448, longitude: -122.1615 }, zoom: 19 };
  
  $http.get('/api/maps').success(function (data) {
    $scope.sensors = data;

  }

}]);



	