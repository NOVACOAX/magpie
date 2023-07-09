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

  $('.socialMedia ul li a').each(function() {
    VanillaTilt.init(this, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
  });
  let list = $('.socialMedia ul li');
  let body = $('.body-color');
  list.each(function() {
    $(this).on('mouseenter', function(event) {
      let color = $(event.target).data('color');
      body.css('background-color', color);
    });
    $(this).on('mouseleave', function() {
      body.css('background-color', '#111827');
    });
  });
  
  gsap.registerPlugin(ScrollTrigger);

  const fadeOutStart = 0.95; // Start fade out at 90% progress
  const fadeOutEnd = 1; // Complete fade out at 95% progress
  const camera = gsap.timeline({
    scrollTrigger: {
      trigger: '.camera-div',
      start: "center center",
      end: "+=" + window.innerHeight,
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        if (self.direction === -1 && self.progress === 0) {
          document.body.style.backgroundColor = 'black';
        }
        
        if (self.progress >= fadeOutStart && self.progress <= fadeOutEnd) {
          const opacity = 1 - (self.progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
          gsap.set('.camera', { opacity });
          document.body.style.backgroundColor = 'black';
        }else if(self.progress >= fadeOutEnd){
          document.body.style.backgroundColor = 'black';
          gsap.set('.camera', { visibility: 'hidden' });
        } else {
          gsap.set('.camera', { visibility: 'visible' });
          document.body.style.backgroundColor = '#111827';
          gsap.set('.camera', { opacity: 1 });
        }
      },
    },
  });
  
  camera
    .to('.camera', { scale: 12, transformOrigin: "start" });



})


const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);