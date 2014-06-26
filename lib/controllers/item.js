'use strict';

var mongoose = require('mongoose'),
    Item = mongoose.model('Item');

/**
 * Get awesome things
 */
exports.items = function(req, res) {
  return Item.find(function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.send(err);
    }
  });
};

exports.show = function (req, res, next) {
  var itemId = req.params.id;

  Item.findById(itemId, function (err, item) {
    if (err) return next(err);
    if (!item) return res.send(404);
    res.send(item);
  });
};

exports.itemComplete = function(req, res, next) {
  var itemId = req.param('id');
  Item.findById(itemId, function (err, item) {
    item.done = true;
    item.save(function(err) {
      if (err) return res.send(400);

      res.send(200);
    });
  });
};

exports.create = function (req, res, next) {
  var newItem = new Item(req.body);
  return newItem.save(function(err) {
    if (err){
      return res.json(400, err);
    } else {
      console.log(req.item)
      return res.json(req.item);
    }
  });
};