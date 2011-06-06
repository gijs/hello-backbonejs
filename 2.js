$(function(){
  //
  // Classes
  //      
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element
    events: {
      // DOM events
      'click button#add': 'appendItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'appendItem'); // every function that uses 'this' as the current object should be in here
      
      this.counter = 1;
      this.render(); // self-renders
    },
    render: function(){
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
    },
    appendItem: function(){
      $('ul', this.el).append("<li>hello world"+this.counter+"</li>");
      this.counter++;
    }
  });

  //
  // Instances
  //
  var listView = new ListView();      
});
