
// Debounce do Lodash
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;

			if(!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if(callNow) {
			func.apply(context, args);
		}
	};
}

// Alteração de tabs de acordo com clique em botão
$('[data-group]').each(function(){
	var $allTarget = $(this).find('[data-target]'),
			$allClick = $(this).find('[data-click]'),
			activeClass = 'active';
	
	$allTarget.first().addClass(activeClass);
	$allClick.first().addClass(activeClass);
	
	$allClick.click(function(e){
		e.preventDefault();
		
		var id = $(this).data('click'),
				$target = $('[data-target="' + id + '"]');
		
		$allClick.removeClass(activeClass);
		$allTarget.removeClass(activeClass);
		
		$target.addClass(activeClass);
		$(this).addClass(activeClass);
	});
});

// Deslizamento suave na página ao clicar em qualquer menu principal
$('.menu-nav a[href^="#"]').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
			menuHeight = $('.menu').innerHeight(),
			targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});

// Deslizamento suave para o topo mediante clique no logotipo do projeto
$('.logo').click(function(e){
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 500)
});

// Destaque para menu de acordo com a área na qual a página se encontra
$('section').each(function(){
	var height = $(this).height(),
			offsetTop = $(this).offset().top,
			menuHeight = $('.menu').innerHeight(),
			id = $(this).attr('id'),
			$itemMenu = $('a[href="#' + id + '"]');
	
	$(window).scroll(debounce(function(){
		var scrollTop = $(window).scrollTop();
		if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
			$itemMenu.addClass('active');
		} else {
			$itemMenu.removeClass('active');
		}
	}, 200));
});

// Botão mobile
$('.mobile-btn').click(function(){
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

// Slider

(function() {
	function slider(sliderName, velocity) {
		var sliderClass = "." + sliderName,
			activeClass = "active",
			rotate = setInterval(rotateSlide, velocity);

		$(sliderClass + " > :first").addClass(activeClass);

		$(sliderClass).hover(function() {
			clearInterval(rotate);
		}, function() {
			rotate = setInterval(rotateSlide, velocity);
		});

		function rotateSlide() {
			var activeSlide = $(sliderClass + " > ." + activeClass),
				nextSlide = activeSlide.next();
		
			if(nextSlide.length == 0) {
				nextSlide = $(sliderClass + " > :first");
			}

			activeSlide.removeClass(activeClass);
			nextSlide.addClass(activeClass);
		}

	}

	slider("introducao", 2000);
})();

// Animação de elementos durante deslizamento da página

(function() {
	var $target = $("[data-anime='scroll']"),
		animationClass = "animate",
		offset = $(window).height() * 3/4;

	function animeScroll () {
		var documentTop = $(window).scrollTop();
		$target.each(function() {
			var itemTop = $(this).offset().top;

			if(documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			}
			else {
				$(this).removeClass(animationClass);
			}
		});
	}

	animeScroll();

	$(document).scroll(debounce(function(){
		animeScroll();
	}, 200));
})();