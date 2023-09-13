$(document).ready(function(){
	// carousel
	$('.carousel__inner').slick({
		speed: 1300,
		variableWidth: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right.png"></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					dots: true,
					arrows: false
				}
			}
		]
	});
		// скрипт для табов
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	  });
	
	// переключение кнопки подробнее в карточках
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click',function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

	// modal
	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order').fadeOut('slow');
	});


	$('.button_mini').each(function(i){
		$(this).on('click', function(){
			$('#order .modal__deskr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	// validation form

	function validForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				  },
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Длина имени не менее {0} символов!")
				  },
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свой email",
				  email: "Неправильный адресс почты"
				}
			  }
		});
	}

	validForms('#consultation-form');
	validForms('#consultation form');
	validForms('#order form' );
	
	$('input[name=phone]').mask("+375 (99)-999-99-99");


    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');

        });
        return false;
    });

	// smooth scroll and pageup
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600 ) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
	
	$('a[href=#up]').on('click', function() {

		let href = $(this).attr('href');
	
		$('html, body').animate({
			scrollTop: $(href).offset().top
		});
		return false;
	});

});