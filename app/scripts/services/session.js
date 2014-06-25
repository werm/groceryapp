'use strict';

angular.module('groceryAppApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
