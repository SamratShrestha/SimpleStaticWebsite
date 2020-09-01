$(document).ready(function() {
	//slider for image
	setInterval(function() {
		$('#main-image figure').animate({
			marginLeft: '-100%'
		}, 2000, function() {
			$(this).find('img:last').after($(this).find('img:first'));
			$(this).css({
				marginLeft: 0
			});
		});
	},5000);
});