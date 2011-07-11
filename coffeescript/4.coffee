#### Backbone model
class Item extends Backbone.Model
    # Nested properties.
    defaults:
        part1: "hello"
        part2: "world"

#### Backbone collection
class List extends Backbone.Collection
    model: Item

#### Backbone views
class ItemView extends Backbone.View
    tagName: 'li'

    initialize: ->
        # pass
    
    render: =>
        $(@el).html("<span>#{@model.get('part1')} #{@model.get('part2')}</span>")
        return @ #aka return this `ItemView`

class ListView extends Backbone.View
    # The base element to start rendering on.
    el: $("body")

    # Is called upon class instantiation.
    initialize: ->
        # Create a list.
        @collection = new List()

        # Bind the 'add' event to the @appendItem class method.
        @collection.bind('add', @appendItem)

        @counter = 0
        @render()
        
        # The element to append on.
        @display_tag = $("ul")
        
    # Events bound to this view.
    # "event htmlObject.class#id" : "function_name()"
    events:
        "click button#add": "addItem"
    
    # A rendering function we defined.
    # This function is being called during initialization.
    render: =>
        # Dom appending a button.
        @el.append("<button id='add'>Add list item</button>")

        # Dom appending a list.
        @el.append("<ul></ul>")

        # Loop through collection and call `@appendItem` for each passing item
        # in 
        for item in @collection
            @appendItem item
    
    #### Event Functions
    # This adds an item after pressing the button.
    # Then creates a new item, getting from the defaults set earlier.
    # Lastly we add the new item to the collection while 
    addItem: ->
        # Increment counter and append to display_tag.
        @counter++

        # Create a new item, getting from the defaults set earlier but adding
        # the incremented counter.
        item = new Item()
        item.set({
            # Re-sets part2 to itself plus the counter.
            part2: item.get("part2") + " #{@counter}!"
        })

        # Add item to collection.
        @collection.add(item)

    # Append an item by creating a new `ItemView` and setting it's model
    # property.
    appendItem: (item) =>
        item_view = new ItemView( {model: item} )

        # Render returns an ItemView object
        @display_tag.append(item_view.render().el)


# This is the jQuery ready object, init happens here.
$ ->
    list_view = new ListView()
    