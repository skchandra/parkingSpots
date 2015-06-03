var app = angular.module('myApplicationModule', ['uiGmapgoogle-maps']);

app.controller('MapController', ['$scope', '$http', function ($scope, $http) {
  $scope.map = { center: { latitude: 37.427959, longitude: -122.134975 }, zoom: 19 };

  $http.get()