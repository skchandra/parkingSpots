angular.module('simple-map', ['AngularGM'])
 
.controller('SimpleMapCtrl', function($scope) {
  $scope.$watch('center', function(center) {
   if (center) {
     $scope.centerLat = center.lat();
     $scope.centerLng = center.lng();
   }
  });
  
  $scope.updateCenter = function(lat, lng) {
    $scope.center = new google.maps.LatLng(lat, lng);
  };
});