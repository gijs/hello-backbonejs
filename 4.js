$(function(){
  //
  // Models
  //      
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Item
  });

  //
  // Views
  //
  var ItemView = Backbone.View.extend({
    tagName: 'li', // name of (orphan) root tag in this.el
    initialize: function(){
      _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
      $(this.el).html('<span>'+this.model.get('part1')+' '+this.model.get('part2')+'</span>');
      return this; // for chainable calls, like .render().el
    }
  });
  
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element
    events: {
      // DOM events
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here
      
      this.counter = 1; // global item counter
      this.render(); // self-renders
      
      // Model events
      this.collection.bind('add', this.appendItem);
    },
    render: function(){
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){
        appendItem(item);
      }, this);
    },
    addItem: function(){
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });
      this.collection.add(item);
      this.counter++;
    },
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });

  //
  // Instances
  //  
  var list = new List();
  var listView = new ListView({
    collection: list
  });      
});
