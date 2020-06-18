var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var UAString = navigator.userAgent;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}

if (UAString.toLowerCase().indexOf('safari') != -1) {
  if (UAString.toLowerCase().indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}

if(UAString.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}



$(document).ready(function(){


  var bLazy = new Blazy({
    src: 'data-blazy'
  });

  // checking browser for WEBP
  hasWebP().then(function () {
    $('.webp-img').each(function () {
      var webp = $(this).data('webp');
      $(this).attr('data-blazy', webp);
    });

    bLazy.revalidate();

  }, function () {
    $('.webp-img').each(function () {
      var img = $(this).data('img');
      $(this).attr('data-blazy',  img );
    });

    bLazy.revalidate();
  });


  if($(document).width() > 992){
    $('.header__menu-item').hover(function () {
      $(this).addClass('open');
    }, function () {
      $(this).removeClass('open');
    });
  } else {
    $('.header__menu-item').click(function (e) {
      if($(e.target).hasClass('header__menu-link')){
        e.preventDefault();
        $(this).addClass('open');
      }
      if($(e.target).hasClass('mobile-back-link')){
        e.preventDefault();
        $(this).removeClass('open');
      }
    });
  }



  $('#menu-btn').click(function () {
    $(this).closest('header').toggleClass('menu-open');
    $('#header-menu').toggleClass('open');
    $(this).toggleClass('show');
    $('body').toggleClass('oh');
  });

  if($(window).width() < 992){

    $('.mobile-arrow').click(function (e) {
      $(this).parent().toggleClass('open');
    });

    // $('.parent').click(function (e) {
    //   $(this).toggleClass('open');
    // });
    //
    // $('.parent-sub').click(function (e) {
    //   $(this).toggleClass('open');
    // });
  }


  $( ".calculator__select" ).selectmenu();




  $('.site-form__btn-i').click(function () {
    if($(this).closest('form').find('input[type="tel"]').val().indexOf('_') === -1  && $(this).closest('form').find('input[type="text"]').val().length > 0){
      $(this).closest('form').addClass('submitted');
    } else {
      if($(this).closest('form').find('input[type="tel"]').val().length === 0 || $(this).closest('form').find('input[type="tel"]').val().indexOf('_') > 0){
        $(this).closest('form').find('input[type="tel"]').parent().addClass('error-field');
      }
      if($(this).closest('form').find('input[type="text"]').val().length === 0){
        $(this).closest('form').find('input[type="text"]').parent().addClass('error-field');
      }
    }
  });

  $(document).on('click', '.error-field', function () {
    $(this).removeClass('error-field');
  });

  $('input[data-valid="phone"]').click(function () {
    console.log(213);
    if($(this).parent().hasClass('error-field')){
      $(this).parent().removeClass('error-field');
    }
  });

  /*sliders start*/
  $('#licen-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  });
  /*sliders end*/


  var phoneMask = $('input[data-valid="phone"]');
  $(phoneMask).inputmask('+7 999 999 99 99');


  /*popups start*/
  $(document).on('click', 'a[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
  });

  $(document).on('click', '.popup', function (e) {

    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
    }
  });
  /*popups end*/

  $('#licen-slider').magnificPopup({
    delegate: 'a:not(.slick-cloned)',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300
    },
    removalDelay: 300,
    disableOn: 0,
    midClick: true,

  });

});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();
