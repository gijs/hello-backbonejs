$(function(){
  Backbone.sync = function(method, model, success, error){ // override persistence storage with dummy function
    success();                                             // this enables use of Model.destroy() without raising an error
  }
  
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
    tagName: 'li', // name of tag to be created        
    events: { 
      // DOM events
      'click span.swap':  'swap',
      'click span.delete': 'delete'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'swap', 'delete'); // every function that uses 'this' as the current object should be in here

      // Model events
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; // for chainable calls, like .render().el
    },
    unrender: function(){
      $(this.el).remove();
    },
    swap: function(){
      var swaped = {
        part1: this.model.get('part2'), 
        part2: this.model.get('part1')
      };
      this.model.set(swaped);
    },
    delete: function(){
      this.model.destroy(); // destroy model (also remove it from collection)
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
      
      this.counter = 0;
      this.render();
      
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
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });
      this.collection.add(item);
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
