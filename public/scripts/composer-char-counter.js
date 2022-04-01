$(document).ready(function () {
	//function to change the counter for character tweet length
	$('textarea').keyup(function () {
		const keyCount = $(this).val().length;
		const counterLog = $(this).parent().find('.counter'); //traverses through DOM to parents
		counterLog.val(140 - keyCount);
		if (keyCount >= 0 && keyCount < 140) {
			counterLog.css({ color: '#545149' });
		} else {
			counterLog.css({ color: 'red' });
		}
	});
});
