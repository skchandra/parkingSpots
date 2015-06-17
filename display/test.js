var centerlat = 37.2213723998;
var centerlong = -121.984349394;
var app = angular.module('myApplicationModule', ['uiGmapgoogle-maps'])
  .controller('MapController', ['$scope', '$http', function ($scope, $http) {
    $scope.map = { center: {latitude: centerlat, longitude: centerlong }, zoom: 18, bounds: {} };
    $scope.greenmarkers = [];
    $scope.newmarkers = [];
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

    var markerHistory = [];

    //wrap the server call into a function
    //it will allow multiple calls later
    function refreshMarkers() {      
      $http.get('api/gps').success(function (data) {
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
            showWindow: true,
            occupied: gps[2],
          };
          return mark;
        };

        var array = $scope.sensors;

        //reinit the markers, because otherwise each call
        //will accumulate additional markers
        $scope.greenmarkers = [];
        $scope.newmarkers = [];
        $scope.redmarkers = [];

        for (var i = 0; i < length; i++) {

          occupied = array[i][2];

          if (markerHistory[i] === undefined) {
            markerHistory.push({i: occupied});
          } else {
            if (occupied === "0") {
              if (markerHistory[i] === "1") {
                alert('A new spot opened up at ' + startTime());
                $scope.newmarkers.push(createMarker(i));
              } 
            } 
            markerHistory[i] = occupied;
          }

          if (occupied === "1"){
            $scope.redmarkers.push(createMarker(i));
          } else {
            $scope.greenmarkers.push(createMarker(i));
          }
        }
      }).error(function(data){
    });
  }

  function startTime(){
    var today = new Date();
    var h = ((today.getHours() <= 12) ? today.getHours() : today.getHours() - 12);
    var m = today.getMinutes();
    var s = today.getSeconds(); 
    return [ h, m, s ].join(':')
  }
  //call the function to init the markers immediately
  refreshMarkers();

  //define refresh interval in milliseconds
  //after each 2 seconds the function will be called and markers refreshed
  setInterval(refreshMarkers, 4000);
}]);
