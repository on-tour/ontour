'use strict';

import Backbone from 'backbone';
import Marionette from '../../lib/backbone.marionette.min';
import App from '../App';

export default Marionette.ItemView.extend({

	tagName: 'div',

	template: _.template('<%= name %>'),

	events: {
		'click' : 'select'
	},

	initialize: function() {
		this.listenTo(this.model, 'change:active', this.activate);
	},

	select: function() {
		this.model.collection.models.forEach(function(model) {
			if (model == this.model) {
				if (this.model.get('active')) {
					this.model.set('active', false);
					App.vent.trigger('setEvent' + this.model.collection.type, '');
				} else {
					this.model.set('active', true);
					App.vent.trigger('setEvent' + this.model.collection.type, 
						this.model.collection.type == 'Month' ? 
							this.model.collection.indexOf(this.model) : 
							this.model.get('name'));
				}
			} else {
				model.set('active', false);
			}
		}, this);
	},

	activate: function() {
		if (this.model.get('active')) {
			this.$el.addClass('active');
		} else {
			this.$el.removeClass('active');
		}
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});