$(document).ready(async function () {
  new Rellax('.rellax',);

  const lenis = new Lenis({});
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  await loadFull(tsParticles);
  $("body")
    .particles()
    .ajax("assets/js/particlesjs-config.json", function (container) {
      // container is the particles container where you can play/pause or stop/start.
      // the container is already started, you don't need to start it manually.
    });

    lightbox.option({
      'disableScrolling': true,
      'wrapAround': true,
    });

  /**
 * Hero type effect
 */
  const typed = $('.typed');
  if (typed.length) {
    let typed_strings = typed.attr('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  const logo = gsap.timeline({
    scrollTrigger: {
      trigger: '.logo_div',
      start: "top bottom",
      scrub: 1,
    }
  });
  logo.to('.logo', { scale: 1.1, y: 30 });

  const typedInfoElements = $('.typed_info');
  typedInfoElements.each(function () {
    const typedInfo = $(this);
    const delay = 800;
    const typedInfoString = typedInfo.attr('data-typed-item').split('|');
    const typedInfoDelay = parseInt(typedInfo.attr('data-typed-position')) * delay;
    new Typed(this, {
      strings: typedInfoString,
      loop: false,
      typeSpeed: 50,
      showCursor: false,
      startDelay: typedInfoDelay,
    });
  });

  $('#image-track').scroll(function () {
    var containerWidth = $(this).width();
    var scrollLeft = $(this).scrollLeft();
    var images = $(this).find('.image');

    images.each(function () {
      // var imageWidth = $(this).width();
      var imagePosition = $(this).offset().left - $(this).parent().offset().left;
      var objectPosition = (imagePosition - scrollLeft + containerWidth / 2) / containerWidth * 100;

      $(this).css('object-position', objectPosition + '% center');
    });
  });
  $('#image-track img').each(function () {
    VanillaTilt.init(this, {
      max: 5,
      reverse: true,
      glare: true,
    });
  });

  $('.socialMedia ul li a').each(function () {
    VanillaTilt.init(this, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
  });
  let list = $('.socialMedia ul li');
  let body = $('.body-color');
  list.each(function () {

    $(this).hover(
      function (event) {
        let color = $(event.target).data('color');
        body.css('background-color', color);
      },
      function () {
        body.css('background-color', '#111827');
      }
    );

  });

  const fadeOutStart = 0.95;
  const fadeOutEnd = 1;
  const camera = gsap.timeline({
    scrollTrigger: {
      trigger: '.camera-div',
      start: "center center",
      end: "+=" + window.innerHeight,
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        if (self.progress >= fadeOutStart && self.progress <= fadeOutEnd) {
          const opacity = 1 - (self.progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
          gsap.set('.camera', { opacity });
          $('.body-color').css('background-color', 'black');
        } else if (self.progress >= fadeOutEnd) {
          $('.body-color').css('background-color', 'black');
          gsap.set('.camera', { visibility: 'hidden' });
        } else {
          gsap.set('.camera', { visibility: 'visible' });
          $('.body-color').css('background-color', '#111827');
          gsap.set('.camera', { opacity: 1 });
        }
      },
    },
  });
  camera
    .to('.camera', { scale: 12, transformOrigin: "start" });
    
    $('.gala').each(function(index, element) {
      const gala = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "+=" + (window.innerHeight * 0.3),
          scrub: true,
          // markers: true,
        }
      });
      const gala_color = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "+=" + window.innerHeight,
          scrub: true,
          // markers: true,
          onUpdate: (self) => {
            const backgroundColor = $(element).data('color');
              $('.body-color').css('background-color', backgroundColor);
            
          }
        }
      });
    
      gala.fromTo($(element).find('.images-div img'), {
        opacity: 0.3,
        x: 50
      }, {
        opacity: 1,
        x: 0
      });
    });
    
    const certs = gsap.timeline({
      scrollTrigger: {
        trigger: '.certs',
        start: "top bottom",
        end: "+=" + window.innerHeight,
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
            $('.body-color').css('background-color', '#111827');
        }
      }
    });
    $('.certs div a').each(function () {
      VanillaTilt.init(this, {
        max: 20,
        reverse: true,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    });

})