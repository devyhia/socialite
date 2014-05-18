// for more details see: http://emberjs.com/guides/views/

Nagiza.ChattingIndexView = Ember.View.extend({
  templateName: 'chatting/index',
  didInsertElement: function() {
  	var c = this.get('controller');
  	$("#txt").keyup(function(e) {
  		if(e.keyCode == 13) {
  			c.send('chat');
  		}
  	});
  }
});
