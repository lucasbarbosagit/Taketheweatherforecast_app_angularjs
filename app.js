//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
                 
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});

// SERVICES

weatherApp.service('cityService', function() {
    
  this.city = "New York, NY";
      
});



// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
                                         
    $scope.$watch('city', function() {
       cityService.city = $scope.city;                                 
    });
                                         
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', '$routeParams', function($scope, $resource, cityService, $routeParams) {
      
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    
    $scope.weatherAPI =
$resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});        
    
    //Neste ponto, foi preciso coloca o appid, pois agora é preciso, mas na epoca do tutorial não era preciso.
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid:'2de143494c0b295cca9337e1e96b00e0' });
    
    $scope.convertToCelsius = function(degK) {
        
        return Math.round(degK - 273);
    }
    
    
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
        
    };
    
    
}]);
