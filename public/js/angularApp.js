var contactsApp = angular.module('contactsApp', []);

contactsApp.controller('appCtrl', ['$scope', '$http', function($scope, $http)
{
    $scope.editting = false;
    $scope.contacts = [];

    var get = function()
    {
        $http.get('/contacts').then(function successCallback(response)
            {
                console.log("Successfully executed GET /contacts: " + response.status + '-' + response.statusText);

                $scope.contacts = response.data;
            },
            function errorCallback(response)
            {
                console.log("Failed to execute GET /contacts: " + response.status + '-' + response.statusText);
            });
    }

    $scope.update = function(id)
    {
        for (var i = 0; i < $scope.contacts.length; i++)
        {
            if ($scope.contacts[i]._id === id)
            {
                console.log($scope.contacts[i]);
                $http.put('/contacts/' + id, $scope.contacts[i]).then(function(response)
                {
                    get();
                    console.log("Updated.");
                }, function(response)
                {
                    console.log("An error occurred.");
                });
                break;
            }
        }
    }

    $scope.addContact = function()
    {
        console.log($scope.contact);

        $http.post('/contacts', $scope.contact)
            .then(function successCallback(response)
                {
                    if (response.data.reason)
                    {
                        console.log(response.data.description);
                        console.log('Failure!');
                    }
                    else
                    {
                        console.log("Success!");
                        console.log(response.data);
                        $scope.contact = {};
                    }

                    get();
                },
                function errorCallback(response)
                {
                    console.log('Failure!');
                });
    }

    $scope.remove = function(id)
    {
        $http.delete('/contacts/' + id)
            .then(function successCallback(response)
                {
                    console.log("Successfully executed DELETE /contacts/" + id);
                    console.log(response.data);
                    get();
                },
                function errorCallback(response)
                {
                    console.log("Failed to execute DELETE /contacts" + id + ": " + response.status + "-" + response.statusText);
                });
    }

    get();
}]);
