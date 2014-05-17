angular.module('shortly', ['ngRoute'])
.config(
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'client/templates/home.html',
        controller: 'linkController',
        controllerAs: 'link'
      })
      .when('/create', {
        templateUrl: 'client/templates/shorten.html',
        controller: 'createController',
        controllerAs: 'creator'
      })
      .otherwise({
        redirectTo: '/'
      });

  }
)

.controller('mainController', function($route, $routeParams, $location) {
  this.$route = $route;
  this.$location = $location;
  this.$routeParams = $routeParams;
})

.controller('linkController', function($http) {
  var self = this;
  $http({
    method: 'GET',
    url: '/links'
  }).success(function(data) {
    self.links = data;
  });
})

.controller('createController', function($scope, $http) {
  $scope.submit = function() {
    if ($scope.text) {
      $http({
        method: 'POST',
        url: '/links',
        data: {url: $scope.text}
      }).success(function(data) {
        console.log("posted! ", data)
      });
    }
  };
});
