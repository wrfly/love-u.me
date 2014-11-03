jQuery(function($){
	if($(window).width() > 998 ){
		$('.about-process-step:last-of-type, .about-process-title:last-of-type').css({width:'203px'});

		$('.plan .about-process-title span:before').css({
	                'background-image' : 'url(images/sprite.png)',
	                'background-position' :'-548px 0px'
	            });
	  
	    $('.create .about-process-title span:before').css({
	                'background-image' : 'url(images/sprite.png)',
	                'background-position' :'-541px -101px'
	            });

	    $('.execute .about-process-title span:before').css({
	                'background-image' : 'url(images/sprite.png)',
	                'background-position' :'-529px -198px'
	            });

	    $('.grow .about-process-title span:before').css({
	                'background-image' : 'url(images/sprite.png)',
	                'background-position' :'-547px -337px'
	            });

	}else if($(window).width() > 767 && $(window).width() < 999){
		$('.about-process-step:last-of-type, .about-process-title:last-of-type').css({width:'142px'});
	}



	function workGridMargin(){
			if($(window).width() > 998 ){
				
				$('.some-of-our-work-item:nth-child(2n+1)').css({'margin-right': 14});

			}else if($(window).width() > 767 && $(window).width() < 999){
			
				$('.some-of-our-work-item:nth-child(2n+1)').css({'margin-right': 8});				

			}else if($(window).width() > 599 && $(window).width() < 768){
				
				$('.some-of-our-work-item:nth-child(2n+1)').css({'margin-right': 6});				

			}else{
				$('.some-of-our-work-item:nth-child(2n+1)').css({'margin-right': 0});
			}
	}

	workGridMargin();
	$(window).on('resize', function(){
		workGridMargin();
	});
});