
# A backbone view class
class ListView extends Backbone.View
    # This is the element which we want to edit.
    el: $('body')

    # Is called upon class instantiation
    initialize: ->
        @render()
    
    # A rendering function we defined.
    render: =>
        # Just a simple dom append
        @el.append("<ul> <li>Hello World</li> </ul>")

# This is the jQuery ready object, init happens here.
$ ->
    list_view = new ListView()
    