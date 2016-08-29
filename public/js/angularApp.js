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

  $scope.addContact = function()
  {
    console.log($scope.contact);

    $http.post('/contacts', $scope.contact)
    .then(function successCallback(response)
    {
      console.log('Success!');
      console.log(response.data);

      get();
    },
    function errorCallback(response)
    {
      console.log('Failure!');
    });
  }

  $scope.remove = function(id)
  {
    //console.log(id);
    $http.delete('/contacts/' + id)
    .then(function successCallback(response)
    {
      console.log("Successfully executed DELETE /contacts/" + id);
      get();
    },
    function errorCallback(response)
    {
      console.log("Failed to execute DELETE /contacts" + id + ": "+ response.status + "-" + response.statusText);
    });
  }

  get();
}]);
