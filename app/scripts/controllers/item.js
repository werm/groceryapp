'use strict';

angular.module('groceryAppApp')
  .controller('ItemCtrl', function ($scope, $http, $resource, Item, Sockets) {

    var Items = $resource('/api/items', {
      id: '@id'
    },{
        update: {
          method: 'PUT'
        }
      });

    $scope.item = new Items();
    $scope.itemList = Items.query();

    socket.on('send:item', function (data) {
      $scope.newItem = data.name;
      console.log($scope.newItem)
    });

    $scope.getTotalItems = function () {
      var notDone = []
      for (var i = 0; i < $scope.itemList.length; i++) {
        if($scope.itemList[i].done === false || !$scope.itemList[i].done){
          notDone.push($scope.itemList[i])
        }
      }
      return notDone.length;
    };
    
    $scope.saveItem = function() {
      var method = $scope.item.id ? '$update' : '$save';
      $scope.item[method]({}, function() {
        $scope.item = new Items();
        $scope.itemList = Items.query();
      });
    };

    $scope.itemNotComplete = function(id) {
      var item = Item.get({ id: id });
      item.done = false;
      console.log(item.done)
      Item.updateNotDone({ id: id }, item);
      $scope.itemList = Items.query();
    };

    $scope.itemComplete = function(id) {
      var item = Item.get({ id: id });
      item.done = true;
      Item.updateDone({ id: id }, item);
      $scope.itemList = Items.query();
    };

    $scope.processForm = function() {
      $http.post('/api/items', $scope.formData)
      .success(function(data) {
        console.log(data);
        if (!data.success) {
          // if not successful, bind errors to error variables
          $scope.error = 'Error posting data'
        } else {
          $scope.itemList = Items.query();
          $scope.message = data.message;
        }
      });
    };

  });