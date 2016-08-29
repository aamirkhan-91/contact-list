var contactsApp = angular.module('contactsApp', []);

contactsApp.controller('appCtrl', ['$scope', '$http', function($scope, $http)
{
  // $scope.persons = [{name: "Aamir", email: "aamir@email.com", number: "1234"}];

  var get = function()
  {
    $http.get('/contacts')
    .then(function successCallback(response)
    {
      console.log("Successfully executed GET /contacts: " + response.status + '-' + response.statusText);

      $scope.persons = response.data;
    },
    function errorCallback(response)
    {
      console.log("Failed to execute GET /contacts: " + response.status + '-' + response.statusText);
    });
  }

  get();
}]);
