// 'use strict';

// angular.module('groceryApp')
//   .factory('Item', ['$resource', function($resource) {
//     return $resource('http://localhost:1337/item/:id', null, {
//       'update': { method:'PUT' },
//       'delete': { method: 'DELETE'}
//     });
//   }]);

'use strict';

angular.module('groceryAppApp')
  .factory('Item', function ($resource) {
    return $resource('/api/items/:id', {
      id: '@id'
    }, { //parameters default
      update: { method: 'PUT', isArray: false },
      delete: { method: 'DELETE' },
      get: { method: 'GET' }
    });
  });
