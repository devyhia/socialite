// for more details see: http://emberjs.com/guides/controllers/

Nagiza.ChattingIndexController = Ember.Controller.extend({
	init: function() {
		this.set('chat', Em.A([]));
	},
	
	actions: {
		chat: function() {
			var chat = this.get('chat');
			chat.pushObject($('#txt').val());
			this.set('chat', chat);
			$('#txt').val('');
		}
	}
});