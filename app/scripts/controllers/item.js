'use strict';

angular.module('groceryAppApp')
  .controller('ItemCtrl', function ($scope, $http, $resource, Item, Sockets) {

    var socket = io.connect();

    var Items = $resource('/api/items', {
      id: '@id'
    },{
        update: {
          method: 'PUT'
        }
      });

    $scope.item = new Items();
    $scope.itemList = Items.query();

    // $('#itemForm').submit(function(e){
    //   e.preventDefault();
    //   var newItem = $('#itemForm').serializeArray();
    //   socket.emit('send-item', newItem);
    // });

    socket.on('new-item', function(data){
      console.log("From socket")
      $scope.itemList = Items.query();
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
        socket.emit('send-item');
        $scope.item = new Items();
        $scope.itemList = Items.query();
      });
    };

    $scope.itemNotComplete = function(id) {
      var item = Item.get({ id: id });
      item.done = false;
      Item.updateNotDone({ id: id }, item);
      $scope.itemList = Items.query();
      socket.emit('send-item');
    };

    $scope.itemComplete = function(id) {
      var item = Item.get({ id: id });
      item.done = true;
      Item.updateDone({ id: id }, item);
      $scope.itemList = Items.query();
      socket.emit('send-item');
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