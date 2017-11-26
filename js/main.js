//YaMaps

$(function () {

	ymaps.ready(init);
    var myMap;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [59.91817154482064,30.30557799999997],
            zoom: 11,
            controls: []
        });

        myMap.behaviors.disable('scrollZoom');

		var coords = [
		    [59.94554327989287,30.38935262114668],
		    [59.91142323563909,30.50024587065841],
		    [59.88693161784606,30.319658102103713],
		    [59.97033574821672,30.315194906302924]
		],
		    myCollection = new ymaps.GeoObjectCollection({}, {
		    	iconLayout: 'default#image',
	        	iconImageHref: 'icons/map-marker.svg',
	        	iconImageSize: [46, 57],
	        	iconImageOffset: [-26, -52],
		    	draggable: false
		    });

		for (var i = 0; i < coords.length; i++) {
		    myCollection.add(new ymaps.Placemark(coords[i]));
		}

		myMap.geoObjects.add(myCollection);
    }
})


//запрет или разрешение скороллинга
  var scrollControl = function(param) {
    $.fn.fullpage.setAllowScrolling(param);
    $.fn.fullpage.setKeyboardScrolling(param, 'down');
  }
//меню в моб версии
        $('.menu-hamburger-link').on('click', function(){
            $('.hamb-menu').css('display','block');
            $('.hamb-menu').addClass('hamb-menu-active');            
            // $("section:not(.first_screen)").css('display','none');
            // $("body").css('overflow','hidden');
            $('body').addClass('disabled-onepage-scroll');
                
            $('.onepage-pagination').css('right','-99999px');
        });
        $('#closeIcon').on('click', function(){
            $('.hamb-menu').css('display','none');
            $('.hamb-menu').removeClass('hamb-menu-active');
            $('.onepage-pagination').css('right','25px');
        });


//slider

$(function() {
  let list = $('.slider__list'),
      sliderItemsCount = $('.slider__item').length;
      sliderWidth = sliderItemsCount * 100 + "%";
          // Определение ширины слайдера в % в зависимости от количества слайдов
      setSliderWidth = function(element, width) {
        $(element).css(width, sliderWidth);
      }
          // анимация движения
      moveSlide = function(container, slideNum) {
        let items = $('.slider__item'),
            activeSlide = items.filter('.active'),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            duration = 500;

        if (reqItem.length) {
          list.animate({
            'left': -reqIndex * 100 + '%'}, duration, () => {
              activeSlide.removeClass('active');
              reqItem.addClass('active');
          });
        }
      }
  setSliderWidth(list, 'width');


  $('.arrow').click(function(e){
    e.preventDefault();

    var $this = $(this),
        container = $('.burgers-section__slider'),
        items = $('.slider__item', container),
        activeItem = items.filter('.active'),
        existedItem, edgeItem, reqItem;

    if ($this.hasClass('arrow-next')) {
      existedItem = activeItem.next();
      edgeItem = items.first();
    }
    if ($this.hasClass('arrow-prev')) {
      existedItem = activeItem.prev();
      edgeItem = items.last();
    }

    reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

    moveSlide(container, reqItem);

  });

});


//acco-team

$(function () {

$('.team-acco__trigger').on('click', e => {
  e.preventDefault()

  const $this = $(e.currentTarget);
  const container = $this.closest('.team-acco');
  const item = $this.closest('.team-acco__item');
  const items = $('.team-acco__item', container);
  const content = $('.team-acco__content', item);
  const otherContent = $('.team-acco__content', container);
  const textBlock = $('.team-acco__content-block', item);
  const reqHeight = textBlock.outerHeight();

  if (!item.hasClass('team-active')) {
    items.removeClass('team-active')
    item.addClass('team-active')

    otherContent.css({
      'height': 0
    })

    content.css({
      'height': reqHeight
    })

  } else {

    item.removeClass('team-active');
    content.css({
      'height' : 0
    })
  }

})

})


//acco-menu

$(function () {

$('.menu__link').click (
  function(e){
    e.preventDefault();
    if ($(this).parent().hasClass('menu__item--active')) {

      $('.menu__item').removeClass('menu__item--active');

    } else {

      $('.menu__item').removeClass('menu__item--active');

      $(this).parent().addClass('menu__item--active');
          
    }

})

})


//OnePageScroll

$(function () {


const display = $('.maincontent');
const sections = $('.section');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const switchMenuActiveClass = sectionEq => {
  $('.fixed-menu__item').eq(sectionEq).addClass('active')
    .siblings().removeClass('active');
}

const performTransition = sectionEq => {
  if (inScroll) return
  inScroll = true

  const position = (sectionEq * -100) + '%';

  display.css({
    'transform': `translate(0, ${position})`,
    '-webkit-transform': `translate(0, ${position})`
  })

  sections.eq(sectionEq).addClass('active')
    .siblings().removeClass('active');

  setTimeout(() => {
    inScroll = false;
    switchMenuActiveClass(sectionEq);
  }, 1300);
}

const defineSections = sections => {
  const activeSection = sections.filter('.active');
  return {
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  }    
}

const scrollToSection = direction => {
  const section = defineSections(sections)

  if (inScroll) return;

  if (direction === 'up' && section.nextSection.length) {
    performTransition(section.nextSection.index())
  }

  if (direction === 'down' && section.prevSection.length) {
    performTransition(section.prevSection.index())
  }
}

$('.wrapper').on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    let direction = (deltaY > 0)
      ? 'up'
      : 'down'

    scrollToSection(direction);
  },
  touchmove: e => (e.preventDefault())
});


$(document).on('keydown', e => {
  const section = defineSections(sections);

  if (inScroll) return 

  switch (e.keyCode) {
    case 40: //вверх
      if (!section.nextSection.length) return;
      performTransition(section.nextSection.index());
      break;

    case 38: //вниз
      if (!section.prevSection.length) return;
      performTransition(section.prevSection.index());
      break;
  }
});

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      scrollToSection(direction);
    }
  });
}

$('[data-scroll-to]').on('click touchstart', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const sectionIndex = parseInt($this.attr('data-scroll-to'));

  performTransition(sectionIndex);
});


})


//fancybox

$(function () {
  $("[data-fancybox]").fancybox({
    // Options will go here
  });

})