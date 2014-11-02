jQuery(function($){
	//Modinizr fallbacks mostly for IE

	Modernizr.load({
	  test: Modernizr.mq('only all'),
	  nope: ['/js/libs/respond.min.js', '/js/ie8.js']
	});

	//Blue gradient fallback
	if(!Modernizr.cssgradients){
		$('.intro').css({'background-image': 'url("/css/images/grad-fallback.gif")'})
	}

	//Form Placeholder fallbacks
	if(!Modernizr.input.placeholder){

		$('[placeholder]').focus(function() {
			var input = $(this);
		  	if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
		  	}
		}).blur(function() {
			var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		
		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			  		input.val('');
				}
		  	})
		})
	}

	/* End Fallbacks*/

	var 
		win = $(window),
		windowSize = win.width(),
		introHeight = win.height() - $('header').outerHeight(),
		mobileMenuToggle = null;


	/* ==================================================

		Mobile navigation function
	
	================================================= */

	$('.mobile-nav a').click(function(e){
		e.preventDefault();	
		
		if(mobileMenuToggle != true){
			mobileMenuToggle = true;		
			if($('.intro').length > 0){
				$('.intro').addClass('animate')
				$('.intro').css({'margin-top': 266});
			}

			$('.nav').addClass('animate').css({'height':200});
			$(this).addClass('active');

		}else{
			mobileMenuToggle = false;
			$(this).removeClass('active');
			if($('.intro').length > 0){
				$('.intro').addClass('animate').css({'margin-top': 0})
			}
			$('.nav').addClass('animate').css({'height': 0});
		}

		$('.nav').on('webkitTransitionEnd transitionend', function() {
			$(this).removeClass('animate');
			$('.intro').removeClass('animate');
		});
	});
	

	//resets the menu if window is re-sized
	win.on('resize', function(){
		if(mobileMenuToggle != null && win.width() > 599){
			mobileMenuToggle = false
			$('.nav').css({'height': ''});
			if($('.intro').length > 0){
				$('.intro').css({'margin-top': 0})
			}
		}
	});




	/* ==================================================

		Homepage Functions

	================================================= */
	

	//intro pannel scroll function
	$('.intro').find('.scroll').click(function(){		
		$('html, body').animate({scrollTop: $(".some-of-our-work").offset().top - 60});
	});

	//intro text fade in function
	$('.intro-text').find('p').each(function(i) {
		if(i == 0){
			setTimeout(function() {
				$('.intro-text').find('p:eq('+i+')').addClass('fade');
			}, 500 * (i + 1));

		} else{

		    setTimeout(function() {
				$('.intro-text').find('p:eq('+i+')').addClass('fade');
				if( $('.intro-text p').length - 1 == i){
					setTimeout(function() {
						$('.scroll').addClass('visible');
						setTimeout(function() {
							$('.vote-for-us').addClass('live');
						}, 500);

					}, 500);
				}
			}, 1000 * (i + 1));
		}
	});




	//waypoint triggers that fire once page is loaded.
	$(window).bind("load", function() {


		var
		workItemsLoaded = null,
		whatpeoplesayloaded = null,
		blogItemsLoaded = null,
		talktousItemsLoaded = null;




		//homepage - some of our work items
		$('.intro-main').waypoint({
			handler: function(direction) {
				if(direction == 'down' && workItemsLoaded == null){
				
					workItemsLoaded = 1;

				  	$('.some-of-our-work-grid .some-of-our-work-item').each(function(i) {
				    	
				    	setTimeout(function() {
							$('.some-of-our-work-grid .some-of-our-work-item:eq('+i+')').addClass('visible');
						}, 250 * (i + 1));
			    	});
			    }
		  	},
		  	offset: '20%'
		});

		//homepage - what people say
		$('.what-people-say-item').waypoint({
			handler: function(direction) {
				if(direction == 'down' && whatpeoplesayloaded == null){
					whatpeoplesayloaded = 1;
				  	$('.what-people-say-item').addClass('visible');
			    }
		  	},
		  	offset: '80%'
		});

		//homepage - from the blog
		$('.from-the-blog').waypoint({
			handler: function(direction) {
				if(direction == 'down' && blogItemsLoaded == null){
					blogItemsLoaded = 1;
				  	$('.from-the-blog-wrapper').addClass('visible');
			    }
		  	},
		  	offset: '80%'
		});

		//homepage - talk to us individual divs
		$('.talk-to-us').waypoint({
			handler: function(direction) {
				if(direction == 'down' && talktousItemsLoaded == null){
					talktousItemsLoaded = 1;
				  	$('.talk-to-us div').each(function(i) {	
				    	setTimeout(function() {
							$('.talk-to-us .talk-to-us-item:eq('+i+')').addClass('visible');
						}, 10 * (i + 1));
			    	});
			    }
		  	},
		  	offset: '80%'
		});


		$('.project-social').waypoint({
			handler: function(direction) {
				if(direction == 'down'){
				  	$('.project-social-image').addClass('dull');
			    }
		  	},
		  	offset: '80%'
		});

	});


	/* ==================================================

		Project page functions
	
	================================================= */

	//Project page carousel function
	if($('.related-projects-carousel').size() > 0){
		$('.related-projects-carousel').carouFredSel({
			auto: false,
			items: 3,
			scroll: 1,
			width:730,
			align: 'center',
			prev: '.prev1',
			next: '.next1',
			swipe: {
				onMouse: true,
				onTouch: true
			}
		});	
	}
	
	//form validation
	if($('.project-planner-page-form').length > 0){
		$('.project-planner-page-form').validate({
			rules: {
				project_name:{
			    	required: true
			    },
				project_email:{
			    	required: true,
			         email: true
			    }
			},
		    messages:{
		        project_name:{
		        	required:"Please enter your name"
		        },
		        project_email:{
		        	required:"Please enter your email address"
		        }
		    }
		});

	}	

	/* ==================================================

		Project Planner Functions
	
	================================================= */

	//project planner radio label functions
	$('.radios label').click(function(e){
		$('.radios label').removeClass('active');
		$(this).addClass('active');			
	});



	/* ==================================================

		Contact page Functions
	
	================================================= */

	//form page validation
	if($('.contact-page-form').length > 0){
		$('.contact-page-form').validate({
			rules: {
				contact_name:{
			    	required: true
			    },
				contact_email:{
			    	required: true,
			         email: true
			    }
			},
		    messages:{
		        contact_name:{
		        	required:"Please enter your name"
		        },
		        contact_email:{
		        	required:"Please enter your email address"
		        }
		    }
		});
	}	


	//Google Maps styling and initialization
	function initialize() {
	
		var styles = [
			{
			stylers: [
			  { saturation: -100 },
			  { lightness: -17 }
			]
			
			}
		];
		
		// Create a new StyledMapType object, passing it the array of styles,
		// as well as the name to be displayed on the map type control.
		var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
		
		// Create a map object, and include the MapTypeId to add
		// to the map type control.
		var mapOptions = {
			disableDefaultUI: true, 
			navigationControl: true, 
     	 	scrollwheel: true, 
      		zoom: 15,
			center: new google.maps.LatLng(51.385582,-2.3608),
			streetViewControl: false,
			navigationControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},   
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},
		
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
		};
		
		var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
		
		//Associate the styled map with the MapTypeId and set it to display.
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style'); 
			
		var image = new google.maps.MarkerImage(
			'/css/images/maps-icon.png',
			new google.maps.Size(100, 83),	// size
			new google.maps.Point(0,0),	// origin
			new google.maps.Point(50, 83)	// anchor
		);
		
		var shadow = new google.maps.MarkerImage(
			'/css/images/maps-icon-shadow.png',
			new google.maps.Size(100, 83),	// size
			new google.maps.Point(0,0),	// origin
			new google.maps.Point(50, 83)	// anchor
		);	
		
		var myLatLng = new google.maps.LatLng(51.385582,-2.3608);
		
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			shadow: shadow,
			icon: image
		});        
	
	}
	
	//runs the GMAPS function if the map-canvas div exisists
	 if($('#map_canvas').size() > 0){
	     initialize();
	 }


	 /* ==================================================

		About Page Functions
	
	================================================= */

	//fading in of people
	if($('.meet-the-team').length > 0){
		$('.meet-the-team').find('article').each(function(i) {
		    setTimeout(function() {
				$('.meet-the-team').find('article:eq('+i+')').addClass('visible');
			}, 230 * (i + 1));
		});	
	}

	//about graph function * Not used *
	if($('.about-process-graph').length > 0 && Modernizr.cssanimations){

		$('.about-process-step:first').addClass('active');


		if($(window).width() < 767){
			$('.about-process-step:first').addClass('open');
		}

		$('.about-process-title').click(function(){
			if($(window).width() > 767){

				$('.about-process-step.active').removeClass('active');
				$(this).parent().addClass('delay').addClass('active').bind('webkitTransitionEnd transitionend', function() {
					$('.delay').removeClass('delay');
				});


			} else{
				if($(this).parent().hasClass('open')){
					$(this).parent().addClass('animate').removeClass('open').bind('webkitTransitionEnd transitionend', function() {
						$('.animate').parent().removeClass('animate');
						console.log('test1');
					});
				}else{
					$(this).parent().addClass('animate').addClass('open').bind('webkitTransitionEnd transitionend', function() {
						$('.animate').removeClass('animate');
						console.log('test2');
					});
				}
			}
		});
	}else{

		$('.about-process-step .about-process-content').hide();
		$('.about-process-step:first').addClass('active').find('.about-process-content').show();
		


		$('.about-process-title').click(function(){
			if($(this).parent().hasClass('active')){

			} else{
				$('.active').removeClass('active').find('.about-process-content').hide();
				$(this).parent().addClass('active').find('.about-process-content').show();
			}
		});
	}

	/* ==================================================

		 Work Page Functions
	
	================================================= */

	//fading in of work items
		if($('.work-page').length > 0){
		$('.some-of-our-work.work-page').find('.some-of-our-work-item').each(function(i) {
		    setTimeout(function() {
				$('.some-of-our-work.work-page').find('.some-of-our-work-item:eq('+i+')').addClass('visible');
			}, 250 * (i + 1));
		});	
	}

	

	/* ==================================================

		Client Page Functions
	
	================================================= */

	//fading in of Clients
	if($('.client-list').length > 0){
		$('.client-list').find('li').each(function(i) {
		    setTimeout(function() {
				$('.client-list').find('li:eq('+i+')').addClass('visible');
			}, 40 * (i + 1));
		});	
	}


	/* ==================================================

		404 Page Functions
	
	================================================= */

	//this makes mudman blink and jump
	if($('.error404').size() > 0){
		random1 = Math.ceil(Math.random() * 10000);
		random2 = Math.ceil(Math.random() * 10000);

		function blink(){
			$('.mudman-body').addClass('blink');
			setTimeout(function(){
				random1 = Math.ceil(Math.random() * 10000);
				$('.mudman-body').removeClass('blink');
				setTimeout(blink, random1)
				
			},100);		
		}
		setTimeout(blink, random1)


		function jump(){
			$('.mudman').addClass('jump');
			setTimeout(function(){
				random2 = Math.ceil(Math.random() * 10000);
				$('.mudman').removeClass('jump');
				setTimeout(jump, random2)
				
			},1600);		
		}
		setTimeout(jump, random2)
	}



//sliding navigation

function fixedNav(){
	if($(window).width() < 600){
		$('.hidden-nav').hide()
	}else{
		$('.hidden-nav').show()
	}
}
fixedNav();

$(window).bind('resize', function(){
	fixedNav();
});

	var

	dropdownnav = null;

	function ieNavFallback(){

		if(dropdownnav != true){
			dropdownnav  = true
			$('.hidden-nav').animate({
				top : 0
			});
		}else{
			dropdownnav  = false
			$('.hidden-nav').animate({
				top : -78
			});
		}

	}


$('.header').waypoint({
	handler: function(direction) {
		if(Modernizr.cssanimations){
			$('.hidden-nav').toggleClass('visible');
		}else{
			ieNavFallback();
		}
	},
	offset		:'-122px'
});




if($('.image-title').length > 0){
	$('.image-title-image').addClass('opaque');
	$('.image-title').find('h1').addClass('visible');
}

if($('.project-intro').length > 0){
	$(window).bind('load', function(){
		$('.project-intro').find('.view-website').addClass('visible'); 
		$('.project-description').find('p').addClass('visible');
		$('.project-image-slideshow').find('.bx-wrapper').addClass('visible');
		$('.project-testimonial-content').find('p').addClass('visible');
		$('.project-social').find('.page-width').addClass('visible');
		$('.project-services').addClass('visible');
		$('.other-projects').find('.bx-wrapper').addClass('visible');
	});

}
	

var slider = $('.bxslider').bxSlider({
	infiniteLoop: true,
	useCSS: true,
	auto:true,
	slideMargin: 10
});

var resizeCalled;
var otherSlider;

if($(window).width() > 900 ){
	otherSlider = $('.otherSlider').bxSlider({
		slideWidth: 5000,
		minSlides: 3,
		maxSlides: 3,
		slideMargin: 10,
		pager: false,
		controls: true
	});
}else if($(window).width() < 900 && $(window).width() > 490 ){
	otherSlider = $('.otherSlider').bxSlider({
		slideWidth: 5000,
		minSlides: 2,
		maxSlides: 2,
		slideMargin: 10,
		pager: false,
		controls: true
	});
}else if( $(window).width() < 490){
	otherSlider = $('.otherSlider').bxSlider({
		slideWidth: 5000,
		minSlides: 1,
		maxSlides: 1,
		slideMargin: 0,
		pager: false,
		controls: true
	});
}










//about page
if($('.responsive-image').length > 0){

	var imageResize = {
    init: function() {
        this.doImages();
    },
    onResize: function() {
        this.doImages();   
    },

	doImages: function() {
        var images = $('.responsive-image');
        width = $( window ).width(),
        images.each(function() {
           if (width < 769) {
               // tablet
               var src = $(this).data('mobile');
           } else {
               // desktop	
               var src = $(this).data('desktop');
           }
           $(this).attr('src', src);
        });
    }
}

imageResize.init();

}





(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


// usage:

var triggerSlideShow;

$(window).smartresize(function(){
	

	if($('.responsive-image').length > 0){
		imageResize.onResize();
	}

	if($('.otherSlider').length > 0){

		if( $(window).width() > 900 && triggerSlideShow != 'largeComplete' ){
			triggerSlideShow = 'largeResize';
		}else if($(window).width() < 900 && $(window).width() > 490 && triggerSlideShow != 'mediumComplete'){
			triggerSlideShow = 'mediumResize';
		}else if( $(window).width() < 490 && triggerSlideShow != 'smallComplete'){
			triggerSlideShow = 'smallResize';
		}
		
		if($(window).width() > 900 && triggerSlideShow === 'largeResize'){
			triggerSlideShow = 'largeComplete';
			otherSlider.reloadSlider({
			    slideWidth: 5000,
				minSlides: 3,
				maxSlides: 3,
				slideMargin: 10,
				pager: false,
				controls: true
			});
			$('.bx-wrapper').addClass('visible-no-del');
		}else if($(window).width() < 900 && $(window).width() > 490 && triggerSlideShow === 'mediumResize'){
			triggerSlideShow = 'mediumComplete';
			otherSlider.reloadSlider({
			    slideWidth: 5000,
				minSlides: 2,
				maxSlides: 2,
				slideMargin: 10,
				pager: false,
				controls: true
			});
			$('.bx-wrapper').addClass('visible-no-del');

		}else if( $(window).width() < 490 && triggerSlideShow === 'smallResize'){
			triggerSlideShow = 'smallComplete';
			otherSlider.reloadSlider({
			    slideWidth: 5000,
				minSlides: 1,
				maxSlides: 1,
				slideMargin: 0,
				pager: false,
				controls: true
			});
			$('.bx-wrapper').addClass('visible-no-del');
		}
	}
	

});


$('.title-ul').find('.prev').html('<');
$('.title-ul').find('.next').html('>');

$('.prev').click(function(){
	otherSlider.goToPrevSlide();
})


$('.next').click(function(){
	otherSlider.goToNextSlide();
});



















});