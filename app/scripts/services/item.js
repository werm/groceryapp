'use strict';

angular.module('groceryAppApp')
  .factory('Item', function ($resource) {
    return $resource('/api/items/:id', {
      id: '@id'
    }, { //parameters default
      update: { method: 'PUT', url: '/api/items/:id' },
      updateDone: { method: 'PUT', url: '/api/itemDone/:id' },
      updateNotDone: { method: 'PUT', url: '/api/itemNotDone/:id' },
      delete: { method: 'DELETE' },
      get: { method: 'GET' }
    });
  });
