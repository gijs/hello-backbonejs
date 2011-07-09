
#### Backbone view class
class window.ListView extends Backbone.View
	# The base element to start rendering on.
	el: $("body")

	# The element to append on.
	display_tag: $("body")

	# Is called upon class instantiation.
	initialize: ->
		@counter = 0
		@render()
		
	# Events bound to this view.
	# "event htmlObject.class#id" : "function_name()"
	events:
		"click button#add": "addItem"
	
	# A rendering function we defined.
	render: ->
		# Dom appending a button.
		@el.append("<button id='add'>Add list item</button>")

		# Dom appending a list.
		@el.append("<ul></ul>")
	
	### Event Functions. ##
	addItem: ->
		# Increment counter and append to display_tag
		@counter++
		@display_tag.append("<li>hello world #{@counter}</li>")

# This is the jQuery ready object, init happens here.
$ ->
	list_view = new ListView()
	