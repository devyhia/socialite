// for more details see: http://emberjs.com/guides/views/

Nagiza.MediaIndexView = Ember.View.extend({
  templateName: 'media/index',
  didInsertElement: function() {
  	$('.object').click(function() {
  		var me = $(this);
  		$('#prev').attr('src', me.attr('src'));
  	});
  }
});
