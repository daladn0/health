$(document).ready(function(){
  // Page scroll
	function pageScroll(anchor) {
    $(anchor).click(function () {
      const _href = $(this).attr("href");
      $("html, body").animate({
        scrollTop: ($(_href).offset().top - 75) + "px"
      }, 600);
      $('.burger').removeClass('burger_active');
      $('.sidebar').removeClass('sidebar_active');
      return false;
    });
  }

  pageScroll('a[href="#services"]');
  pageScroll('a[href="#team"]');
  pageScroll('a[href="#news"]');
  pageScroll('a[href="#map"]');

  // Services show info
  let services__items = document.querySelectorAll('.services__title');
  services__items.forEach( item => {
  item.onclick = function(e) {
    e.preventDefault();
    item.closest('.services__item').classList.toggle('services__item_active');
    item.closest('.services__item').querySelector('.services__hiden-info').classList.toggle('services__hiden-info_active');
  };
  });

  // Tabs
    // Fill button
    $('.team__nav').on('click', 'div:not(.button_outline_active)', function() {
      $(this)
        .addClass('button_outline_active').siblings().removeClass('button_outline_active');
    });

    // Switch tabs
    function switchTabs(att) {
       $(`.team__nav .button[filter=${att}]`).on('click', function() {
        if($(this).attr('val') == 'off') {
          $('.button[filter]').attr('val', 'off');
          $(this).attr('val', 'on');
          if( att == 'all' ) {
            $('.team__items > .team__item').show(0);
          } else {
            $('.team__items > .team__item').hide(0);
            $(`.team__items > .team__item[filter=${att}]`).show(0);
          }
        }
      });
    }

    switchTabs("all");
    switchTabs("ur");
    switchTabs("gi");
    switchTabs("ca");
    switchTabs("re");
    switchTabs("pe");
    switchTabs("ga");
    switchTabs("ne");
    switchTabs("en");
    switchTabs("te");

    // Carousel
    $('.equipment .container').owlCarousel({
        autoplay: true,
        autoplayTimeout: 8000,
        loop:true,
        nav:true,
        navText: ["<img src='src/icons/left2.png'>","<img src='src/icons/right2.png'>"],
        responsive:{
          0:{
            items:1,
            nav: false
          },

          441 : {
            items: 1,
            nav: true
          }
        }
    });

    // Modal window
    // team
    $('.button-modal').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.modal__name').text($('.team__item .team__name').eq(i).text());
        $('.modal__wrapper').fadeIn(0);
        $('.modal__about-doc').fadeIn(0);
        $('.modal__news').fadeOut(0);
       
      });
    });

    // news
    $('.news__item').each(function() {
      $(this).on('click', function() {
        $('.modal__wrapper').fadeIn(0);
        $('.modal__news').fadeIn(0);
        $('.modal__about-doc').fadeOut(0);
      });
    });

    // close
    $('.modal__close').on('click', function(){
        $('.modal__wrapper').fadeOut(0);
        $('.modal__news').fadeOut(0);
        $('.modal__about-doc').fadeOut(0);
    });

    // Burger toggle 
    $('.burger').on('click', function() {
      $(this).toggleClass('burger_active');
      $('.sidebar').toggleClass('sidebar_active');
    });

    // Validate
    $('.team__form').validate({
      rules: {
        name: {
          required: true,
          minlength: 5,
          maxlength: 30
        },
        phone: {
          required: true,
        }
      },
      messages: {
        name: {
          required: 'Вы не ввели имя!',
          minlength: jQuery.validator.format('Введите минимум {0} символов!'),
          maxlength: jQuery.validator.format('Не должно быть больше {0} символов!')
        },
        phone: {
          required: 'Пожалуйста, введите корректный номер телефона!',
        }
      },

      submitHandler: function() {
         $.ajax({
          type: 'POST',
          url: 'src/mailer/smart.php',
          data: $('.team__form').serialize()
        }).done(function() {
          $(this).find('input').val("");
          $('.team__form').trigger('reset');
        });
      }
    });
});