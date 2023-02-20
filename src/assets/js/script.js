function animationMain() {
 Splitting();
 locoScroll.on("scroll", ScrollTrigger.update);
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".scrollContainer", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  new ResizeObserver(() => locoScroll.update()).observe(document.querySelector(".scrollContainer"));

    const reveal = document.querySelectorAll(".char");
    
    gsap.from(reveal, {
      y: "100%",
      duration: .6,
      stagger: .03,
      ease: Power3,
      scrollTrigger: {
        scroller: ".scrollContainer",
        trigger: ".word",
        start: "top 80%",
      }
    })

    const fadeIn = gsap.utils.toArray('.fadeIn');

      fadeIn.forEach(fadeInItem => {
        gsap.from(fadeInItem, { 
          opacity: 0,
          y: 80,
          duration: 1,
          ease: Power3,
          scrollTrigger: {
            scroller: ".scrollContainer",
            trigger: fadeInItem,
            start: "top 90%",
          }
    })
});

const lineX = gsap.utils.toArray('.line-x');

lineX.forEach(lineXItem => {
  gsap.from(lineXItem, { 
    width: "0",
    duration: 1,
    ease: Power3,
    scrollTrigger: {
      scroller: ".scrollContainer",
      trigger: lineXItem,
      start: "top 90%",
    }
})
});

gsap.from(".footer-parallax", {
  y: "-25%",
  opacity: 0,
  scrollTrigger: {
    scroller: ".scrollContainer",
    trigger: ".site-footer",
    start: "top 95%",
    end: "bottom 90%",
    scrub: true
  }
})

const menuToggle = document.getElementById("menuToggle");

const menuBar = gsap.timeline();

var tl = gsap.timeline({ paused: true});

tl.to('.fullpage-menu', {
	duration: 0,
	display: "block",
	ease: 'Expo.easeInOut',
});

tl.from('.menu-bg', {
	duration: .8,
	opacity: 0,
	ease: 'Expo.easeInOut'
});

tl.from('.main-menu li a', {
	duration: 1.3,
	y:"110%",
	stagger: 0.1,
	ease: 'Expo.easeInOut'
}, "-=0.6");

tl.reverse();

menuToggle.addEventListener('click', function(){
	menuBar.reversed(!menuBar.reversed());
	tl.reversed(!tl.reversed());
});

// Greeting
if (document.querySelector("#greeting")) {
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  const welcomeTypes = ["Dzień dobry", "Dobry wieczór"];
  let welcomeText = "";
  if (hour < 18) welcomeText = welcomeTypes[0];
  else welcomeText = welcomeTypes[1];
  greeting.innerHTML = welcomeText;
}

// parallax 
if (window.matchMedia("(min-width: 767px)").matches) {
    gsap.utils.toArray(".parallax-wrap").forEach(function(container) {
      let image = container.querySelector("img");
    
      let tl = gsap.timeline({
          scrollTrigger: {
            scroller: ".scrollContainer",
            trigger: container,
            scrub: true,
            pin: false,
          },
        }); 
        tl.from(image, {
          yPercent: -10,
          ease: "none",
        }).to(image, {
          yPercent: 10,
          ease: "none",
        }); 
    });
  }

  // Loop text
  if (document.querySelector(".loop-text")) {
  gsap.to(".loop-text", { xPercent: -50, ease: 'none', duration: 13, repeat: -1 })
  }
  // Acordion
  if (document.querySelector(".accordion")) {
  let t = document.getElementsByClassName("accordion");
  for (let e = 0; e < t.length; e++) t[e].addEventListener("click", function () {
    let e = this.nextElementSibling;
    if (e.style.maxHeight) e.style.maxHeight = null, this.classList.remove("open");
    else {
      for (let a = 0; a < t.length; a++) t[a].classList.remove("open"), t[a].nextElementSibling.style.maxHeight = null;
      e.style.maxHeight = e.scrollHeight + "px", this.classList.toggle("open");
    }
  });
  }

  // Cursor image
  if (document.querySelector(".hover-reveal-wrap")) {
  const link = document.querySelectorAll('.hover-reveal-wrap');
  const linkHoverReveal = document.querySelectorAll('.hover-reveal');
  const linkImages = document.querySelectorAll('.hidden-img');
  
  for(let i = 0; i < link.length; i++) {
    link[i].addEventListener('mousemove', (e) => {
      linkHoverReveal[i].style.opacity = 1;
      linkHoverReveal[i].style.transform = `translate(-95%, -45% )`;
      
      // linkHoverReveal[i].style.transform = `translate(-50%, -50% ) rotate(5deg)`;
      
      linkImages[i].style.transform = 'scale(1, 1)';
      linkHoverReveal[i].style.left = e.clientX + "px";
    })
    
    link[i].addEventListener('mouseleave', (e) => {
      linkHoverReveal[i].style.opacity = 0;
      linkHoverReveal[i].style.transform = `translate(-95%, -45%) rotate(-5deg)`;
      linkImages[i].style.transform = 'scale(0.8, 0.8)';
    })
  }
}; 

// Scroll progress
if (document.querySelector(".scrollprogress")) {
gsap.to(".scrollprogress", {
  height: "calc(100% - 65px)",
  ease: 'none',
  scrollTrigger: { 
    scroller: ".scrollContainer",
    trigger: ".content",
    start: "top 80px",
    end: "bottom 99%",
    scrub: true,
  }
});
}

// Header opacity
gsap.to(".header-bottom", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".site-header",
    scroller: ".scrollContainer",
    start: "top 0%",
    scrub: true
  }
});
gsap.to(".header-top", {
  scrollTrigger: {
    trigger: ".scrollContainer",
    scroller: ".scrollContainer",
    start: "top 0%",
    toggleClass: { 
      className: "header-shrink", 
      targets: ".header-top" 
    },
    scrub: 1
  }
});

// Scheme Modal
const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});

// Scheme Buttons
const main = document.querySelector("html");
const fontNormal = document.querySelector("#font-normal");
const fontMedium = document.querySelector("#font-medium");
const fontLarge = document.querySelector("#font-large");

fontNormal.addEventListener('click', () => {
  fontNormal.classList.add("active");
  fontMedium.classList.remove("active");
  fontLarge.classList.remove("active");
  main.classList.remove("large");
  main.classList.remove("medium")
})

fontMedium.addEventListener('click', () => {
  fontNormal.classList.remove("active");
  fontMedium.classList.add("active");
  fontLarge.classList.remove("active");
  main.classList.remove("large");
  main.classList.add("medium")
})

fontLarge.addEventListener('click', () => {
  fontNormal.classList.remove("active");
  fontMedium.classList.remove("active");
  fontLarge.classList.add("active");
  main.classList.remove("medium");
  main.classList.add("large")
})


//Contrast buttons
const contrastNormal = document.querySelector("#contrast-normal");
const contrastLow = document.querySelector("#contrast-low");
const contrastHigh = document.querySelector("#contrast-high");

contrastNormal.addEventListener('click', () => {
  contrastNormal.classList.add("active");
  contrastLow.classList.remove("active");
  contrastHigh.classList.remove("active");
  main.classList.remove("contrast-low");
  main.classList.remove("contrast-high");
})

contrastLow.addEventListener('click', () => {
  contrastNormal.classList.remove("active");
  contrastLow.classList.add("active");
  contrastHigh.classList.remove("active");
  main.classList.add("contrast-low");
  main.classList.remove("contrast-high");
})

contrastHigh.addEventListener('click', () => {
  contrastNormal.classList.remove("active");
  contrastLow.classList.remove("active");
  contrastHigh.classList.add("active");
  main.classList.add("contrast-high");
  main.classList.remove("contrast-low");
})

}
