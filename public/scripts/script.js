$(document).ready(function(){
	$("#search").submit(function(event){
		var keyword = ($("#search input").val());
		window.location.href = '/search/'+ keyword;
		return false;
	});



	$('.star').rating({

	});


});