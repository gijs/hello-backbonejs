// _Working example: [3.html](../3.html)._
//
// **This example illustrates how to use a Collection of Models to store data.**

$(function(){
  // `Item` is the atomic part of our Model. A model is basically a Javascript object, i.e. key-value pairs, with some helper functions to handle event triggering, etc.
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });      
  
  // `List` is a collection of `Items`. It is basically an array of Model objects with some helper functions.
  var List = Backbone.Collection.extend({
    model: Item
  });

  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      // DOM events
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); // remember: every function that uses 'this' as the current object should be in here
      
      this.counter = 0;
      this.render();
      
      // Model events
      this.collection.bind('add', this.appendItem);
    },
    render: function(){
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){ // in case collection is not empty
        appendItem(item);
      }, this);
    },
    addItem: function(){
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });
      this.collection.add(item); // add item to collection; view is updated via event 'add'
    },
    appendItem: function(item){
      $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
    }
  });

  // `listView` is now linked to the `list` collection
  var list = new List();
  var listView = new ListView({
    collection: list
  });      
});
