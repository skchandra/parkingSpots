var centerlat = 37.44495;
var centerlong = -122.16163;
var app = angular.module('myApplicationModule', ['uiGmapgoogle-maps'])
  .controller('MapController', ['$scope', '$http', 'uiGmapIsReady', function ($scope, $http) {
    $scope.map = { center: {latitude: centerlat, longitude: centerlong }, zoom: 19, bounds: {} };
    $scope.greenmarkers = [];
    $scope.redmarkers = [];
    

    $scope.$watch('map.bounds', function (bounds) {
      if (map.bounds) {
        $scope.map.bounds.northeast.latitude = map.bounds.northeast.latitude();
        $scope.map.bounds.northeast.longitude = map.bounds.northeast.longitude();
        $scope.map.bounds.southwest.latitude = map.bounds.southwest.latitude();
        $scope.map.bounds.southwest.longitude = map.bounds.southwest.longitude();
        if (map.bounds.northeast.latitude < 37.4458) {
          alert('yes');
        } else {
          alert('no');
        }
      }
    });

    $scope.updateBounds = function (neLat, neLng, swLat, swLng) {
      $scope.map.bounds = new map.bounds(neLat, neLng, swLat, swLng);
    };

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

      var neLat = $scope.map.bounds.northeast.latitude;
      var neLng = $scope.map.bounds.northeast.longitude;
      var swLat = $scope.map.bounds.southwest.latitude;
      var swLng = $scope.map.bounds.southwest.longitude;

      for (var i = 0; i < length; i++) {

        occupied = array[i][2];

        if (neLat < 37.4458) {
          if (occupied === "1"){
            $scope.redmarkers.push(createMarker(i));
          } else {
            $scope.greenmarkers.push(createMarker(i));
          }
        } else {}          
      }
    }).error(function(data){
  });
}]);