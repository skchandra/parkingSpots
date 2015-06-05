var app = angular.module('myApplicationModule', ['uiGmapgoogle-maps'])
  .controller('MapController', ['$scope', '$http', function ($scope, $http) {
    $scope.map = { center: { latitude: 37.44495, longitude: -122.16163 }, zoom: 19 };
    $scope.greenmarkers = [];
    $scope.redmarkers = [];

    function Ctrl($scope) {
      $scope.data = new Data();
    }

    $http.get('/api/gps').success(function (data) {
      $scope.sensors = data;

      var length = Object.keys($scope.sensors).length;
      var pinColor = "FE7569";

      var createMarker = function (i) {
      	var array = $scope.sensors;
        var gps = array[i][1].split(",");

        var mark = {
          id: i,
          latitude: gps[0],
          longitude: gps[1],
          occupied: gps[2],
        };
        return mark;
      };
      
      var array = $scope.sensors;

      for (var i = 0; i < length; i++) {
        occupied = array[i][2];

        if (occupied === "1") {

          $scope.redmarkers.push(createMarker(i));
        }
        else {
          $scope.greenmarkers.push(createMarker(i));
        }
      }
    });
}]);