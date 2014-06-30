'use strict';

angular.module('groceryAppApp')
  .factory('Sockets', function (socketFactory) {
    return socketFactory();
  });
