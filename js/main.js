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


//Slider

/*$(function () {
  $(document).ready(function ($) {
  
  var slideCount = $('#slider ul li').length;
  var slideWidth = $('#slider ul li').width();
  var slideHeight = $('#slider ul li').height();
  var sliderUlWidth = slideCount * slideWidth;
  
  $('#slider').css({ width: slideWidth, height: slideHeight });
  
  $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});    

})*/


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